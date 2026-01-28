require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Barber = require('./models/Barber');
const Service = require('./models/Service');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Barber.deleteMany();
    await Service.deleteMany();

    // Seed barbers
    const barbers = await Barber.insertMany([
      {
        name: 'John Smith',
        specialization: 'Classic Cuts',
        experience: 10,
        rating: 4.8,
        availability: [
          { day: 'Monday', startTime: '09:00', endTime: '18:00' },
          { day: 'Tuesday', startTime: '09:00', endTime: '18:00' },
          { day: 'Wednesday', startTime: '09:00', endTime: '18:00' },
          { day: 'Thursday', startTime: '09:00', endTime: '18:00' },
          { day: 'Friday', startTime: '09:00', endTime: '18:00' },
          { day: 'Saturday', startTime: '10:00', endTime: '16:00' },
        ],
        isAvailable: true,
      },
      {
        name: 'Michael Brown',
        specialization: 'Modern Styles',
        experience: 7,
        rating: 4.6,
        availability: [
          { day: 'Monday', startTime: '10:00', endTime: '19:00' },
          { day: 'Tuesday', startTime: '10:00', endTime: '19:00' },
          { day: 'Wednesday', startTime: '10:00', endTime: '19:00' },
          { day: 'Thursday', startTime: '10:00', endTime: '19:00' },
          { day: 'Friday', startTime: '10:00', endTime: '19:00' },
        ],
        isAvailable: true,
      },
      {
        name: 'David Lee',
        specialization: 'Beard Trimming',
        experience: 5,
        rating: 4.9,
        availability: [
          { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
          { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
          { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
          { day: 'Friday', startTime: '09:00', endTime: '17:00' },
          { day: 'Saturday', startTime: '09:00', endTime: '15:00' },
        ],
        isAvailable: true,
      },
    ]);

    // Seed services
    const services = await Service.insertMany([
      {
        name: 'Basic Haircut',
        description: 'Standard haircut with wash and styling',
        price: 25,
        duration: 30,
        isActive: true,
      },
      {
        name: 'Premium Haircut',
        description: 'Premium haircut with consultation, wash, cut and styling',
        price: 45,
        duration: 45,
        isActive: true,
      },
      {
        name: 'Beard Trim',
        description: 'Professional beard trimming and shaping',
        price: 20,
        duration: 20,
        isActive: true,
      },
      {
        name: 'Hair Coloring',
        description: 'Full hair coloring service',
        price: 80,
        duration: 90,
        isActive: true,
      },
      {
        name: 'Kids Haircut',
        description: 'Haircut for children under 12',
        price: 18,
        duration: 25,
        isActive: true,
      },
      {
        name: 'Haircut & Beard Combo',
        description: 'Complete haircut and beard grooming package',
        price: 40,
        duration: 50,
        isActive: true,
      },
    ]);

    console.log('Database seeded successfully!');
    console.log(`Created ${barbers.length} barbers`);
    console.log(`Created ${services.length} services`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
