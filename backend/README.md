# Hair Cutting Booking API - Backend

Backend API for the Hair Cutting Appointment Booking Application.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB URI and JWT secret.

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Barbers
- `GET /api/barbers` - Get all barbers
- `GET /api/barbers/:id` - Get single barber
- `POST /api/barbers` - Create barber (admin only)
- `PUT /api/barbers/:id` - Update barber (admin only)
- `DELETE /api/barbers/:id` - Delete barber (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Appointments
- `GET /api/appointments` - Get all appointments (user's own or all if admin)
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## Database Models

### User
- name
- email
- password (hashed)
- phone
- role (user/admin)

### Barber
- name
- specialization
- experience
- rating
- image
- availability
- isAvailable

### Service
- name
- description
- price
- duration
- image
- isActive

### Appointment
- user (ref)
- barber (ref)
- service (ref)
- date
- time
- status (pending/confirmed/completed/cancelled)
- notes
