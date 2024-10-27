import os
import yt_dlp
import platform
import shlex
import subprocess
import re

def download_youtube_video(video_url):
    try:
        # Step 1: Download the YouTube video using yt-dlp
        print("Downloading video...")
        ydl_opts_info = {'quiet': True}
        with yt_dlp.YoutubeDL(ydl_opts_info) as ydl_info:
            info_dict = ydl_info.extract_info(video_url, download=False)
            video_title = info_dict.get('title', None)

        # Sanitize the title to remove special characters BEFORE downloading
        sanitized_title = re.sub(r'[\\/*?:"<>|]', "_", video_title)
        output_path = f"{sanitized_title}.mp4"

        # Set the sanitized title in the download options
        ydl_opts = {
            'format': 'best[ext=mp4]',
            'outtmpl': f'{sanitized_title}.%(ext)s',
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])

        print(f"Download complete: {output_path}")

        # Step 2: Remove metadata using ffmpeg
        print("Removing metadata...")
        ffmpeg_command = f"ffmpeg -i \"{output_path}\" -map_metadata -1 -c:v copy -c:a copy \"clean_{output_path}\""
        if platform.system() == "Windows":
            os.system(ffmpeg_command)
        else:
            subprocess.run(shlex.split(ffmpeg_command), check=True)
        print(f"Metadata removed and saved as: clean_{output_path}")

        path = str(os.path.abspath(f'clean_{output_path}'))
        os.remove(output_path)
        print("Original file removed.")
        return path
    except subprocess.CalledProcessError as ffmpeg_error:
        print("FFmpeg failed:", ffmpeg_error.stderr)
    except Exception as e:
        print("An error occurred: ", e)


if __name__ == "__main__":
    video_url = input("Enter the YouTube video URL: ")
    download_youtube_video(video_url)