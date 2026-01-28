# Quick Start Guide

This guide will help you set up and run the Hair Cutting Appointment Booking App quickly.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- For mobile development: React Native environment setup (Android Studio and/or Xcode)

## Step 1: Clone the Repository

```bash
git clone https://github.com/phamvy301104-star/PhatTrienDiDong.git
cd PhatTrienDiDong
```

## Step 2: Set Up Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` and update the following:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/haircut_booking
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d
```

**Note:** 
- If using MongoDB Atlas, update `MONGODB_URI` with your connection string
- Generate a secure JWT secret (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

5. Seed the database with sample data:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm start
```

The backend should now be running at `http://localhost:5000`

## Step 3: Set Up Frontend

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/services/api.js`:
   - For Android Emulator: Use `http://10.0.2.2:5000/api`
   - For iOS Simulator: Use `http://localhost:5000/api`
   - For Physical Device: Use `http://YOUR_COMPUTER_IP:5000/api`

4. Run the app:

**For Android:**
```bash
npx react-native run-android
```

**For iOS (macOS only):**
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

## Step 4: Test the App

1. **Register a new account:**
   - Open the app
   - Click "Don't have an account? Register"
   - Fill in your details
   - Click "Register"

2. **Browse Services:**
   - After login, you'll see the home screen with available services
   - Each service shows price and duration

3. **Book an Appointment:**
   - Click on any service
   - Select a barber
   - Choose a time slot
   - Click "Book Appointment"

4. **View Appointments:**
   - Go to "My Appointments" tab
   - See all your bookings
   - Cancel pending appointments if needed

5. **Profile:**
   - Go to "Profile" tab
   - View your account information
   - Logout when done

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection
- Verify MONGODB_URI in `.env`

**Port Already in Use:**
- Change PORT in `.env` file
- Or kill the process using port 5000: `lsof -ti:5000 | xargs kill`

### Frontend Issues

**Metro Bundler Issues:**
```bash
npx react-native start --reset-cache
```

**Android Build Errors:**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

**iOS Build Errors:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npx react-native run-ios
```

**API Connection Issues:**
- Check if backend is running
- Verify API_URL in `src/services/api.js`
- For physical device, ensure phone and computer are on same network
- Check firewall settings

## Default Seeded Data

After running `npm run seed`, you'll have:

**Barbers:**
- John Smith (Classic Cuts, 10 years experience, 4.8★)
- Michael Brown (Modern Styles, 7 years experience, 4.6★)
- David Lee (Beard Trimming, 5 years experience, 4.9★)

**Services:**
- Basic Haircut ($25, 30 min)
- Premium Haircut ($45, 45 min)
- Beard Trim ($20, 20 min)
- Hair Coloring ($80, 90 min)
- Kids Haircut ($18, 25 min)
- Haircut & Beard Combo ($40, 50 min)

## Next Steps

- Explore the codebase
- Customize services and barbers
- Add more features (reviews, ratings, notifications)
- Deploy to production

## Support

For issues or questions, please open an issue on GitHub.
