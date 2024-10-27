import google.generativeai as genai
import os
import anthropic
import time
import warnings
from googleapiclient.discovery import build

client = anthropic.Anthropic(
    api_key=os.environ['ANTHROPIC'],
)


def chat(input):
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": input}
        ]
    )
    return message.content[0].text


# client = OpenAI()


# def chat(input_text):
#     completion = client.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[
#             {"role": "system", "content": "You are a tutor trying to educate the user"},
#             {
#                 "role": "user",
#                 "content": input_text
#             }
#         ]
#     )
#     return completion.choices[0].message.content


warnings.filterwarnings("ignore", message="urllib3 v2 only supports OpenSSL 1.1.1+")


def response_to_text(response):
    valid_candidate_found = False

    for candidate in response.candidates:
        if candidate.finish_reason != 3:
            return candidate.content.parts[0].text
        else:
            print("Safety reasons: ", candidate.safety_ratings)

    if not valid_candidate_found:
        return "No valid content generated due to safety filters."


def video_to_text(file_name):
    prompts = ["Give me a summary of this video clip",

               "Make me a detailed modular lesson plan in the format $1$ topic 1 \\n $(1)$ subtopic 1 "
               "\\n $(2)$ subtopic 2 \\n $2$ topic 2 \\n $(1)$ subtopic 1 etc.",

               "Make me a 4 choice multiple choice question and answer pair based on the video. The "
               "question has to be in the following format: Answer: [answer letter] Question: "
               "[question]. DO NOT add formatting. The question or a similar question MUST NOT be in "
               "the following list: "]
    genai.configure(api_key=os.environ["GEMINI"])

    video = genai.upload_file(file_name)

    # Track processing status
    attempts = 0
    max_attempts = 12  # Limit attempts to avoid indefinite loops
    while video.state.name == "PROCESSING" and attempts < max_attempts:
        print("Processing...")
        time.sleep(5)
        video = genai.get_file(video.name)
        attempts += 1

    # Check if processing reached a usable state
    if video.state.name not in ["SUCCEEDED", "ACTIVE"]:
        print("Video processing did not reach a usable state. Final state:", video.state.name)
        return "Processing failed or timed out"

    model = genai.GenerativeModel("gemini-1.5-flash")

    print("Generating summary...")
    summary = response_to_text(model.generate_content([video, prompts[0]]))

    print("Generating lesson plan...")
    lesson_plan = response_to_text(model.generate_content([video, prompts[1]]))

    print("Generating multiple choice questions...")
    mcq = []
    for i in range(5):
        print("Question " + str(i))
        question = response_to_text(model.generate_content([video, prompts[2] + str(mcq)]))
        mcq.append([question[8], question[10:]])

    return summary, lesson_plan, mcq


# response = video_to_text("Tie.mp4")
# print(response[0] + '\n' + response[1] + '\n' + str(response[2]))

# print(chat("Hi Claude! can you connect to the internet and give me youtube video recomendations for algorithms?"))

def recommend(prompt):
    API_KEY = os.environ["YOUTUBE"]
    YOUTUBE_API_SERVICE_NAME = 'youtube'
    YOUTUBE_API_VERSION = 'v3'

    # Build a service object
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)

    # Search query example
    search_response = youtube.search().list(
        q=prompt,
        part='snippet',
        maxResults=5,
        type='video'
    ).execute()

    vids = []
    # Print results
    for item in search_response['items']:
        vids.append({"title" : item['snippet']['title'],
                     "URL" : f"Video URL: https://www.youtube.com/watch?v={item['id']['videoId']}"})

    return vids


print(recommend('Python programming tutorial'))
