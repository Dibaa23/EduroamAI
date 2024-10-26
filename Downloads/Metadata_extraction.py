import os
import yt_dlp

def download_video(url, output_folder='downloads', output_path='%(title)s.%(ext)s'):
    # Ensure output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Set the full output path including the folder
    full_output_path = os.path.join(output_folder, output_path)

    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',  # Ensure MP4 format
        'outtmpl': full_output_path,
        'merge_output_format': 'mp4',  # Merge into MP4 container
        'quiet': False,  # Set to True to suppress output
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        # Extract video information and download the video
        info_dict = ydl.extract_info(url, download=True)
        # Get the video title
        video_title = info_dict.get('title', None)
        return video_title

if __name__ == "__main__":
    video_url = input("Enter the YouTube video URL: ")
    video_name = download_video(video_url)
    print(f"Downloaded video: {video_name}")