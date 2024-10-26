# import anthropic
import time

# client = anthropic.Anthropic(
# defaults to os.environ.get("ANTHROPIC_API_KEY")
# api_key=ANTHROPIC,
# )
# message = client.messages.create(
#    model="claude-3-5-sonnet-20246020",
#    max_tokens=1024,
#    messages=[
#        {"role": "user", "content": "Hello, Claude"}
#    ]
# )
# print(message.content)

from openai import OpenAI
import google.generativeai as genai
import os
import Metadata_extraction

client = OpenAI()


def chat(input_text):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a tutor trying to educate the user"},
            {
                "role": "user",
                "content": input_text
            }
        ]
    )
    return completion.choices[0].message.content


def video_to_text(file_name):
    genai.configure(api_key=os.environ["GEMINI"])

    video = genai.upload_file(file_name)

    while video.state.name == "PROCESSING":
        print("processing video...")
        time.sleep(5)
        video = genai.get_file(video.name)

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content([video, "Give me a summary of this video clip. Then, make me a "
                                              "detailed modular lesson plan in the format $1$ topic 1 "
                                              "lesson plan \\n $2$ topic 2 lesson plan \\n."])

    valid_candidate_found = False

    for candidate in response.candidates:
        if candidate.finish_reason != 3:
            return candidate.content.parts[0].text

    if not valid_candidate_found:
        return "No valid content generated due to safety filters."


video = Metadata_extraction.download_video("https://www.youtube.com/watch?v=HXJx8j7JpKY", output_folder='videos')
print(video_to_text(video))
