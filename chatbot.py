from flask import Flask, request, jsonify
import google.generativeai as genai
import os
import anthropic
import time
import warnings
from googleapiclient.discovery import build
import Downloads.Metadata_extraction as meta

# Initialize Flask app
app = Flask(__name__)

# Initialize clients
client = anthropic.Anthropic(api_key=os.environ['ANTHROPIC'])

# Suppress warnings related to urllib3
warnings.filterwarnings("ignore", message="urllib3 v2 only supports OpenSSL 1.1.1+")

# Store conversation history (in-memory, per user session)
# In a production environment, consider using a database or persistent storage
conversation_histories = {}


# Helper function to parse generative AI response
def response_to_text(response):
    valid_candidate_found = False
    safety_rating = []
    for candidate in response.candidates:
        if candidate.finish_reason != 3:
            return candidate.content.parts[0].text
        else:
            safety_rating = candidate.safety_ratings
    if not valid_candidate_found:
        return ("No valid content generated due to safety filters. \n "
                "Safety reasons: \n" + str(safety_rating))


# Chat endpoint using Claude's model
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id', 'default')  # Use 'default' if no user_id is provided
    user_input = data.get('message', '')

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Initialize conversation history for the user if not already present
    if user_id not in conversation_histories:
        conversation_histories[user_id] = []

    try:
        # Append the user's input to the conversation history
        conversation_histories[user_id].append(f"Human: {user_input}")

        # Construct the full context to pass to the AI
        full_context = "\n".join(conversation_histories[user_id]) + "\nAssistant:"

        # Use Claude's model for chat response
        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": full_context}
            ]
        )
        response = message.content[0].text

        # Append the AI's response to the conversation history
        conversation_histories[user_id].append(f"Assistant: {response}")

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Video processing endpoint
@app.route('/api/video-to-text', methods=['POST'])
def video_to_text():
    file_name = request.json.get('file_name', '')

    if not file_name:
        return jsonify({"error": "No file name provided"}), 400

    try:
        prompts = [
            "Give me a summary of this video clip",
            "Based on the video, make me a detailed modular lesson plan in the format $1$ topic 1 "
            "\n $(1)$ subtopic 1 \n $(2)$ subtopic 2 \n $2$ topic 2 \n $(1)$ subtopic 1 etc.",
            "Make me a 4 choice multiple choice question and answer pair based on the video. The "
            "question has to be in the following format: Answer: [answer letter] Question: "
            "[question]. DO NOT add formatting. The question or a similar question MUST NOT be in "
            "the following list: "
        ]

        genai.configure(api_key=os.environ["GEMINI"])
        video = genai.upload_file(file_name)

        # Track processing status
        attempts = 0
        max_attempts = 12
        while video.state.name == "PROCESSING" and attempts < max_attempts:
            print("Processing...")
            time.sleep(5)
            video = genai.get_file(video.name)
            attempts += 1

        if video.state.name not in ["SUCCEEDED", "ACTIVE"]:
            return jsonify({"error": "Processing failed or timed out"}), 500

        model = genai.GenerativeModel("gemini-1.5-flash")

        # Generate responses
        summary = response_to_text(model.generate_content([video, prompts[0]]))
        lesson_plan = response_to_text(model.generate_content([video, prompts[1]]))

        mcq = []
        for i in range(5):
            question = response_to_text(model.generate_content([video, prompts[2] + str(mcq)]))
            mcq.append({"answer": question[8], "question": question[10:]})

        return jsonify({
            "summary": summary,
            "lesson_plan": lesson_plan,
            "multiple_choice_questions": mcq
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# YouTube recommendation endpoint
@app.route('/api/recommend', methods=['POST'])
def recommend():
    prompt = request.json.get('prompt', '')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        API_KEY = os.environ["YOUTUBE"]
        youtube = build('youtube', 'v3', developerKey=API_KEY)

        search_response = youtube.search().list(
            q=prompt,
            part='snippet',
            maxResults=5,
            type='video'
        ).execute()

        vids = [
            {"title": item['snippet']['title'],
             "URL": f"https://www.youtube.com/watch?v={item['id']['videoId']}"}
            for item in search_response['items']
        ]

        return jsonify({"videos": vids})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# YouTube link to video processing
@app.route('/api/link-to-text', methods=['POST'])
def link_to_text():
    link = request.json.get('link', '')

    if not link:
        return jsonify({"error": "No YouTube video link provided"}), 400

    try:
        response = video_to_text(meta.download_youtube_video(link))
        return jsonify({
            "summary": response[0],
            "lesson_plan": response[1],
            "multiple_choice_questions": response[2]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=int(os.environ.get('PORT', 5000)), debug=True)
