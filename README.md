**AIATL 2025**  

### EduAI Setup 

---

## Overview  
This project is EduRoam, an application that will take videos for you and create a study plan from them such as a summary, a lesson plan, a quiz, and reccomendations for further learning! This README specifically goes over how to set the chatbot up and how to set up the env for Anthropic's Claude and Google's Gemini!

---

## Project Setup


### Prerequisites
Ensure you have the following installed before proceeding:
- **Node.js** (v14 or later)
- **npm** (v6 or later)

### Installation Instructions

#### Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

#### Install Dependencies
Run the following commands to install the necessary npm packages:

```bash
# React Router for routing
npm install react-router-dom

# Material UI components and icons
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

# React (if not already installed)
npm install react react-dom

# Optional: React Player (if used for VideoPlayer component)
npm install react-player
```

### Running the Application
To start the development server, run:
```bash
npm start
```
The application will be available at [http://localhost:3000](http://localhost:3000).

### Project Overview
This project contains several components:
- **HomePage:** The initial landing page for uploading video files or submitting YouTube links.
- **TableOfContents:** Displays a table of contents for easy navigation.
- **VideoPlayer:** Plays the uploaded video or YouTube link.
- **Chatbot:** A chatbot to interact with users.
- **StudySection, TestingSection, MultimediaSection:** Additional sections for study materials, quizzes, and multimedia recommendations.

### Usage
When the application starts, you will land on the **HomePage** where you can either upload a video file or provide a YouTube link.  
Once submitted, you will be redirected to the main page where additional features are available, including a video player, chatbot, and other sections.

### Additional Information
- **Material UI:** The project makes use of Material UI components for consistent UI/UX.
- **React Router:** Navigation within the app is handled using React Router.


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

