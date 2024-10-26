import os
import yt_dlp

def download_video(url, output_folder='downloads', output_path='%(title)s.%(ext)s'):
    # Ensure output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Set the full output path including the folder
    full_output_path = os.path.join(output_folder, output_path)

    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'outtmpl': full_output_path,
        'merge_output_format': 'mp4',
        'quiet': False,  # Set to True to suppress output
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == "__main__":
    video_url = input("Enter the YouTube video URL: ")
    download_video(video_url)