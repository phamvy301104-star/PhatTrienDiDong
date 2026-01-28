# API Testing Guide

This guide provides example API requests for testing the Hair Cutting Booking API.

## Prerequisites

1. Start the backend server:
```bash
cd backend
npm start
```

2. The server should be running at `http://localhost:5000`

## API Examples

### 1. User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. User Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get All Services

```bash
curl http://localhost:5000/api/services
```

### 4. Get All Barbers

```bash
curl http://localhost:5000/api/barbers
```

### 5. Get Current User (Protected Route)

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Create Appointment (Protected Route)

```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "service": "SERVICE_ID_HERE",
    "barber": "BARBER_ID_HERE",
    "date": "2026-02-01",
    "time": "10:00"
  }'
```

### 7. Get User Appointments (Protected Route)

```bash
curl http://localhost:5000/api/appointments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8. Update Appointment Status (Protected Route)

```bash
curl -X PUT http://localhost:5000/api/appointments/APPOINTMENT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "confirmed"
  }'
```

### 9. Delete Appointment (Protected Route)

```bash
curl -X DELETE http://localhost:5000/api/appointments/APPOINTMENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Seeding the Database

Before testing, seed the database with sample barbers and services:

```bash
cd backend
npm run seed
```

This will create:
- 3 barbers with different specializations
- 6 services with varying prices and durations

## Testing Workflow

1. Start the backend server
2. Seed the database with sample data
3. Register a new user
4. Login to get the authentication token
5. Browse services and barbers
6. Create an appointment
7. View your appointments
8. Update or cancel appointments

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Notes

- Replace `YOUR_TOKEN_HERE` with the actual token received from login/register
- Replace `SERVICE_ID_HERE`, `BARBER_ID_HERE`, `APPOINTMENT_ID` with actual IDs from the database
- Dates should be in ISO format (YYYY-MM-DD)
- Times should be in HH:MM format (24-hour)
