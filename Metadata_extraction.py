import os
import yt_dlp

<<<<<<< HEAD

=======
>>>>>>> bf05aaf102d54f9f00340a3b09a20e4b166dc138
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
        # Extract video information and download the video
        info_dict = ydl.extract_info(url, download=True)
        # Get the video title
        video_title = info_dict.get('title', None)
        return video_title

