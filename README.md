**AIATL 2025**  

### EduAI Setup 

---

## Overview  
This project is EduRoam, an application that will take videos for you and create a study plan from them such as a summary, a lesson plan, a quiz, and reccomendations for further learning! This README specifically goes over how to set the chatbot up and how to set up the env for Anthropic's Claude and Google's Gemini

---

## Prerequisites  
Make sure you have the following before proceeding:  
- **Python 3.7 or higher:** Required for running the chatbot and its dependencies.  
- **pip:** Python's package manager for installing dependencies.  

---

## Setting Up the Python Environment  

To keep dependencies isolated, it's recommended to create a virtual environment.  

### Step 1: Create a Virtual Environment  
Run the following command:  
```bash
python -m venv venv
```

### Step 2: Activate the Virtual Environment  
- **On Windows:**  
   ```bash
   venv\Scriptsactivate
   ```
- **On macOS/Linux:**  
   ```bash
   source venv/bin/activate
   ```

---

## Python Dependencies  

### Step 3: Install Required Python Packages  

#### **Anthropic API Client**  
Used to interface with the Claude model, enabling chatbot responses.  
```bash
pip install anthropic
```

#### **Requests (Optional)**  
For making HTTP requests, useful when interacting with external APIs.  
```bash
pip install requests
```

#### **Python Dotenv (Optional)**  
Manages environment variables from a `.env` file, securing API keys and sensitive information.  
```bash
pip install python-dotenv
```

#### **Google Generative AI Client (Gemini)**  
Used to interact with Google’s generative AI models. Supports generating content from YouTube and other inputs.  
```bash
pip install google-generativeai
```

#### **YouTube Data API Client (Optional)**  
Fetches and processes YouTube video information.  
```bash
pip install google-api-python-client
```

---

## Creating the `.env` File  
If you’re using `python-dotenv` to manage environment variables, create a `.env` file in the root directory. It should contain your API keys:  
```env
ANTHROPIC_API_KEY=sk-ant-api-key-here  
GEMINI_API_KEY=google-gemini-api-key-here
```
> Replace `sk-ant-api-key-here` and `google-gemini-api-key-here` with your actual API keys.

---

## Running the Chatbot  

### Step 4: Run the Python Script  
Ensure your virtual environment is activated and run the chatbot script:  
```bash
python Chatbot_server.py
```

Provide the required inputs correctly, as the chatbot relies on them for generating responses.

### Deactivating the Virtual Environment  
When done, deactivate the virtual environment by running:  
```bash
deactivate
```

---

## Summary  
- **Virtual Environment Setup:** Use `venv` to create and activate an isolated environment.  
- **Dependencies:** Install `anthropic`, `requests`, `python-dotenv`, `google-generativeai`, and `google-api-python-client` as needed.  
- **Environment Variables:** Use a `.env` file to securely store API keys.  
- **Running the Chatbot:** Activate the virtual environment and execute the Python script to start the chatbot.  

---


## Dependencies for Video Downloader Script

To run the YouTube video downloader script successfully, you will need to install the following dependencies:

### NPM Installations  
**None:** This script does not require any npm packages since it is written in Python.

### Python Installations  
- **yt-dlp:** You need this library to download YouTube videos.  
  ```bash
  pip install yt-dlp
  ```

- **ffmpeg:** You need to have ffmpeg installed to remove metadata from the downloaded video.  

  - **On macOS:**  
    ```bash
    brew install ffmpeg
    ```

  - **On Windows or Linux:**  
    Download it from [FFmpeg's official website](https://ffmpeg.org) and add it to your system PATH.

### Additional Notes  
The script uses built-in Python libraries such as `os`, `platform`, `shlex`, and `subprocess`, so no additional installation is required for these.

Make sure that all dependencies are correctly installed before running the script.

