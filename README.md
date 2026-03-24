# AI Safe Alert App

## Overview
AI Safe Alert App is a safety-focused web application that enables users to quickly send emergency alerts during unsafe situations. The app includes an AI-powered assistant that provides real-time safety guidance, emergency response suggestions and supports faster access to help through location sharing and alert notifications.

## Features
- SOS emergency alert button
- Live location sharing (demo version)
- Emergency contact notifications
- AI-powered safety assistant/chat support

## AI Component
The AI system provides:
- Emergency response suggestions
- Risk/urgency detection via chatbot
- Safety guidance during distress situations

## Tech Stack
- Frontend: React
- AI: OpenAI API
- Backend: (To be decided by team)

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an environment file:
   ```bash
   cp .env.example .env
   ```
3. Add your OpenAI key in `.env`:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the backend API proxy:
   ```bash
   npm run dev:server
   ```
5. In a second terminal, start the frontend app:
   ```bash
   npm run dev
   ```

## Team Roles
- Product Manager
- Product Designer
- Software Developer
