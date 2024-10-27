from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import anthropic
import time
import warnings
from googleapiclient.discovery import build
import Downloads.Metadata_extraction as meta
from google.cloud import videointelligence

path = '/Users/jc/wp/AIATL/EduroamAI/Tie.mp4'


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


def video_to_text(file_name):
    prompts = ["Give me a summary of this video clip",
               "Based on the video, make me a detailed modular lesson plan in the format $1$ topic 1 "
               "\n $(1)$ subtopic 1 \n $(2)$ subtopic 2 \n $2$ topic 2 \n $(1)$ subtopic 1 etc.",
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

    model = genai.GenerativeModel("gemini-1.5-flash-8b")

    print("Generating summary...")
    try:
        summary = response_to_text(model.generate_content([video, prompts[0]]))
    except Exception as e:
        API_KEY = os.environ["YOUTUBE"]

        # Build the YouTube API client
        youtube = build("youtube", "v3", developerKey=API_KEY)

        # Fetch video metadata using the YouTube Data API
        request = youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id="jpsP0N3FomY"
        )
        response = request.execute()

        # Extract metadata from the response
        if "items" in response and len(response["items"]) > 0:
            video_info = response["items"][0]
            snippet = video_info.get("snippet", {})
            statistics = video_info.get("statistics", {})
            content_details = video_info.get("contentDetails", {})

            # Display metadata
            print("Title:", snippet.get("title", "N/A"))
            print("Description:", snippet.get("description", "N/A"))
            print("Published At:", snippet.get("publishedAt", "N/A"))
            print("Channel Title:", snippet.get("channelTitle", "N/A"))
            print("Tags:", snippet.get("tags", "N/A"))
            print("View Count:", statistics.get("viewCount", "N/A"))
            print("Like Count:", statistics.get("likeCount", "N/A"))
            print("Dislike Count:", statistics.get("dislikeCount", "N/A"))
            print("Comment Count:", statistics.get("commentCount", "N/A"))
            print("Duration:", content_details.get("duration", "N/A"))
            print("Caption Availability:", content_details.get("caption", "N/A"))

        else:
            print(response)
        return None
    print("Generating lesson plan...")
    print(str(video.size_bytes))
    lesson_plan = response_to_text(model.generate_content([video, prompts[1]]))
    print("Generating multiple choice questions...")
    mcq = []
    for i in range(5):
        print("Question " + str(i))
        question = response_to_text(model.generate_content([video, prompts[2] + str(mcq)]))
        mcq.append([question[8], question[10:]])
    return summary, lesson_plan, mcq


if __name__ == '__main__':
    print(video_to_text(path))
