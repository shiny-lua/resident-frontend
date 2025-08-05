# ZEGOCLOUD Setup Guide

## Overview
This project uses ZEGOCLOUD for real-time voice calling in the mock interview sessions. The integration allows two users (examiner and student) to join a session via a unique code and conduct voice interviews.

## Setup Instructions

### 1. ZEGOCLOUD Account Setup
1. Sign up at [ZEGOCLOUD](https://www.zegocloud.com/)
2. Create a new project in your ZEGOCLOUD console
3. Get your App ID and Server Secret from the project settings

### 2. Environment Variables
Create a `.env` file in the `resident-frontend` directory with the following variables:

```env
# ZEGOCLOUD Configuration
REACT_APP_ZEGOCLOUD_APP_ID=your-zegocloud-app-id
REACT_APP_ZEGOCLOUD_SERVER_SECRET=your-zegocloud-server-secret

# Backend URL
REACT_APP_BACKEND_URL=http://localhost:10101
```

### 3. Install Dependencies
```bash
cd resident-frontend
npm install
# or
yarn install
```

### 4. Backend Configuration
Make sure your backend has the following environment variables set:

```env
# OpenAI API Key (for AI evaluation)
OPENAI_API_KEY=your-openai-api-key

# Other required variables
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
PORT=10101
```

## How It Works

### Session Flow
1. **Create Session**: Examiner creates a session with a specialty and gets a unique session code
2. **Join Session**: Student joins using the session code
3. **Voice Call**: Both users connect via ZEGOCLOUD voice calling
4. **Question Display**: AI generates questions for the examiner to ask
5. **Response Evaluation**: AI evaluates student responses in real-time
6. **Feedback**: Both users see AI-generated feedback and scores

### Features
- **Real-time Voice Calling**: Powered by ZEGOCLOUD
- **AI Question Generation**: Contextual questions based on specialty
- **Response Evaluation**: AI-powered scoring and feedback
- **Session Management**: Unique codes for easy joining
- **Role-based Interface**: Different UI for examiner vs student

### API Endpoints
- `POST /api/mock-interview/create-session` - Create new session
- `POST /api/mock-interview/join-session` - Join existing session
- `POST /api/mock-interview/evaluate-response` - Evaluate student response
- `GET /api/mock-interview/get-session` - Get session details

## Troubleshooting

### Common Issues
1. **ZEGOCLOUD Connection Failed**: Check your App ID and Server Secret
2. **Voice Not Working**: Ensure microphone permissions are granted
3. **Session Not Found**: Verify the session code is correct
4. **AI Evaluation Failed**: Check OpenAI API key configuration

### Support
- ZEGOCLOUD Documentation: https://docs.zegocloud.com/
- ZEGOCLOUD Support: Available through their console 