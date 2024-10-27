# EduroamAI
AIATL 2025

Chatbot Python Setup README




Overview

This repository contains a chatbot project implemented using a Python script (Chatbot_server.py). This README provides a step-by-step guide to setting up the Python environment for the chatbot. The chatbot relies on several dependencies to interact with the Anthropics Claude model, manage environment variables, and make HTTP requests.

Prerequisites

Before setting up the environment, make sure you have:

Python 3.7 or higher: You need a recent version of Python to run the chatbot and its dependencies.

pip: Python's package manager for installing dependencies.

Setting Up the Python Environment

To keep dependencies isolated, it's recommended to create a virtual environment.

Step 1: Create a Virtual Environment

Run the following command to create a virtual environment named venv:

python -m venv venv

Step 2: Activate the Virtual Environment

Activate the virtual environment:

On Windows:

venv\Scripts\activate

On macOS/Linux:

source venv/bin/activate

Python Dependencies

Below is a list of all the required Python packages for this project, along with the installation commands.

Step 3: Install Required Python Packages

Anthropic API Client

This package is used to interface with the Claude model from Anthropics. It allows the chatbot to communicate and generate meaningful responses based on user input.

Installation Command:

pip install anthropic

Requests (Optional)

This package is used for making HTTP requests. If you need to interact with other APIs or make web requests as part of your chatbot's extended functionality, you should install this package.

Installation Command:

pip install requests

Python Dotenv (Optional)

This package helps manage environment variables by allowing you to load them from a .env file. It is useful for keeping API keys and other sensitive information secure.

Installation Command:

pip install python-dotenv

Google Generative AI Client (Gemini)

This package is used to interface with Google's generative AI models (such as Gemini). It allows the chatbot to generate content based on YouTube videos and other input.

Installation Command:

pip install google-generativeai

YouTube Data API Client (Optional)

This package is used to interact with YouTube, allowing the chatbot to fetch video information and process YouTube content.

Installation Command:

pip install google-api-python-client

Creating the .env File

If you are using the python-dotenv package to manage environment variables, create a .env file in the root directory of your project. This file should contain the API keys for the Anthropics Claude model and Google Generative AI:

ANTHROPIC_API_KEY=sk-ant-api-key-here
GEMINI_API_KEY=google-gemini-api-key-here

Replace sk-ant-api-key-here and google-gemini-api-key-here with your actual API keys.

Running the Chatbot

Once the environment is set up and dependencies are installed, you can run the chatbot script.

Step 4: Run the Python Script

Make sure your virtual environment is activated and run the script using:

python Chatbot_server.py

Ensure that all necessary inputs are provided correctly, as the chatbot relies on user input to generate responses.

Deactivating the Virtual Environment

When you're done, deactivate the virtual environment by running:

deactivate

Summary

Virtual Environment Setup: Use venv to create and activate a virtual environment.

Dependencies: Install anthropic, requests, python-dotenv, google-generativeai, and google-api-python-client as needed for the chatbot.

Environment Variables: Use a .env file to manage sensitive information such as API keys.

Running the Chatbot: Activate the virtual environment and execute the Python script to run the chatbot.

