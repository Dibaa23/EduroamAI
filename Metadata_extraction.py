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
        # Re-encode to H.264 for video and AAC for audio
        'postprocessors': [
            {
                'key': 'FFmpegVideoConvertor',
                'preferedformat': 'mp4',  # Convert to .mp4 with compatible codecs
            },
            {
                'key': 'FFmpegMetadata',  # Optional: To add metadata to output file
            },
        ],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        # Extract video information and download the video
        info_dict = ydl.extract_info(url, download=True)
        # Get the full path of the downloaded video from 'requested_downloads'
        requested_downloads = info_dict.get('requested_downloads', [])
        if requested_downloads:
            video_path = requested_downloads[0]['filepath']
            return video_path
        else:
            raise ValueError("No downloads were found.")
