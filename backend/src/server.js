require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');

// Import routes
const authRoutes = require('./routes/auth');
const barberRoutes = require('./routes/barbers');
const serviceRoutes = require('./routes/services');
const appointmentRoutes = require('./routes/appointments');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Hair Cutting Booking API is running' 
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
