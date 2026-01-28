# PhatTrienDiDong

## Hair Cutting Appointment Booking App

A full-stack mobile application for booking hair cutting appointments.

## Project Structure

```
├── backend/          # Node.js + Express + MongoDB backend API
└── frontend/         # React Native mobile application
```

## Features

### Backend (BE)
- User authentication with JWT
- RESTful API endpoints
- MongoDB database with Mongoose
- Barber management
- Service management
- Appointment booking system
- Role-based access control (User/Admin)

### Frontend (FE)
- User registration and login
- Browse available services
- Select barbers and time slots
- Book and manage appointments
- User profile management
- Real-time appointment status updates

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React Native
- React Navigation
- Axios
- AsyncStorage
- Context API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- React Native development environment

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/services/api.js`

4. Run the app:
```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

## API Documentation

See `backend/README.md` for detailed API documentation.

## License

ISC