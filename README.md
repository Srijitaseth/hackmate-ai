# HackMate AI

HackMate AI is a full-stack mobile application designed to help hackathon participants find the right teammates quickly and effectively. The platform uses profile-based analysis and an AI-driven recommendation layer to suggest compatible team members based on skills, interests, and goals.

The project focuses on solving a common problem in hackathons: forming balanced and efficient teams under time constraints.

---

## Overview

HackMate AI allows users to:

- Create and manage a personal profile
- Discover potential teammates ranked by compatibility
- Receive AI-generated recommendations
- Initiate conversations with matched users
- Explore team formation in a structured way

The system is designed to be scalable and ready for integration with real-time services and authentication.

---

## Project Structure


---

## Tech Stack

### Frontend
- React Native (Expo)
- TypeScript
- Expo Router
- Axios

### Backend
- Node.js
- Express.js

### AI Layer
- Custom matching logic (LLM-ready architecture)

### Planned Integrations
- Firebase Authentication
- Firebase Firestore
- Real-time chat (Firestore or Socket-based)

---

## How It Works

1. The user creates a profile with skills, interests, roles, and goals.
2. The frontend sends this data to the backend using REST APIs.
3. The backend processes the data through a matching engine.
4. The AI layer evaluates compatibility between users.
5. The system returns ranked matches and suggestions.
6. Users can view matches and initiate conversations.

---

## API Endpoints

### Save Profile
POST /profile

### Get Matches
GET /matches/:userId

### Get AI Recommendations

---

## Key Features

- Profile-based matchmaking
- AI-assisted recommendations
- Clean and modular architecture
- Mobile-first user interface
- Expandable backend design

---

## Current Limitations

- User authentication is not implemented (uses a placeholder user ID)
- Data is not persisted in a database
- Chat system is UI-based and not real-time
- AI logic is simulated and not connected to a live LLM

---

## Challenges Faced

- Managing communication between frontend and backend during early development
- Handling navigation and data passing across multiple screens
- Structuring the project for scalability while still iterating quickly
- Designing an AI flow without a fully integrated model
- Ensuring consistent API responses and error handling

---

## Future Improvements

- Integrate Firebase Authentication for real users
- Store user profiles and messages in Firestore
- Implement real-time chat functionality
- Connect to a production AI model (OpenAI or similar)
- Deploy backend services to a cloud platform
- Add push notifications
- Improve matching algorithm with more parameters

---

## Getting Started

### Backend


---

## Key Features

- Profile-based matchmaking
- AI-assisted recommendations
- Clean and modular architecture
- Mobile-first user interface
- Expandable backend design

---

## Current Limitations

- User authentication is not implemented (uses a placeholder user ID)
- Data is not persisted in a database
- Chat system is UI-based and not real-time
- AI logic is simulated and not connected to a live LLM

---

## Challenges Faced

- Managing communication between frontend and backend during early development
- Handling navigation and data passing across multiple screens
- Structuring the project for scalability while still iterating quickly
- Designing an AI flow without a fully integrated model
- Ensuring consistent API responses and error handling

---

## Future Improvements

- Integrate Firebase Authentication for real users
- Store user profiles and messages in Firestore
- Implement real-time chat functionality
- Connect to a production AI model (OpenAI or similar)
- Deploy backend services to a cloud platform
- Add push notifications
- Improve matching algorithm with more parameters

---

## Getting Started

### Backend

cd backend
npm install
npm start

### Frontend

cd hackmate-ai
npm install
npm start

Make sure both frontend and backend are running, and update the API base URL in the frontend if needed.

---

## Contribution

This project was developed as part of a hackathon-focused solution. Contributions, improvements, and suggestions are welcome.

---

## License

This project is open for educational and demonstration purposes.
