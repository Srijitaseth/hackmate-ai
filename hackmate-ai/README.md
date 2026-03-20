# 🚀 HackMate AI

HackMate AI is a modern mobile application built with React Native (Expo) that helps users find the perfect teammates for hackathons using AI-powered recommendations.

---

## ✨ Features

### 🔐 Authentication
- Sign In / Sign Up UI
- Biometric authentication (Fingerprint / Face ID)
- Guest login support
- Always opens auth screen first

### 🏠 Home Dashboard
- Personalized greeting
- Search for projects, skills, and people
- Stats overview (Matches, Projects, Messages)
- Trending projects
- Recommended teammates

### 🤖 AI Team Builder
- Chat-based AI assistant
- Suggests teammates based on input
- Real-time chat UI

### 💬 Chat System
- Chat list with unread indicators
- Chat detail screen
- Clean messaging UI

### 📁 Projects
- Browse hackathon projects
- Project detail view
- Skills required + team progress
- Join request UI

### 👤 Profile
- Skills, links, stats
- Availability toggle (Available / Busy / Open)
- Dark / Light theme switch

### 📊 Analytics Dashboard
- WebView integration
- Stats overview
- Growth preview

---

## 🛠 Tech Stack

- React Native (Expo)
- Expo Router
- TypeScript
- React Hooks
- Expo Local Authentication
- React Native WebView

---

## 📁 Project Structure

app/ ├── (auth)/ │  
           └── auth.tsx 
      ├── (tabs)/ │   
              ├── home.tsx │   
              ├── projects.tsx │   
              ├── ai.tsx │   
              ├── chat.tsx │  
              └── profile.tsx
      ├── chat/[id].tsx
      ├── project/[id].tsx 
      ├── webview.tsx 
      ├── _layout.tsx

---

## ⚙️ Installation

### 1. Clone the repo

git clone [https://github.com/your-username/hackmate-ai.git](https://github.com/codewithdhanus/hackmate-ai.git) cd hackmate-ai

### 2. Install dependencies

npm install

### 3. Install required packages

npx expo install expo-router react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated npx expo install expo-local-authentication npx expo install react-native-webview

### 4. Run the app

npx expo start --tunnel

---

## 📱 Run on Device

- Install Expo Go
- Scan QR code
- App opens automatically

---

## ⚠️ Notes

- App always starts from auth screen
- Use `router.replace()` after login
- Biometrics work only on real devices
- WebView not supported on web platform

---

## 🧪 Troubleshooting

### Clear cache

npx expo start -c

---

## 🚀 Future Improvements

- Backend integration
- Real AI matching system
- Push notifications
- Real-time chat

---

## 👨‍💻 Author

Dhanush  
MERN Stack Developer  
