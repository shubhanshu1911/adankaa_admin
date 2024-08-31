require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure if connection fails
  });

const createAdminUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash('ishan548', 10); // Hash the password
    const adminUser = new User({
      email: 'ishankhare30@gmail.com',
      password: hashedPassword,
      role: 'admin'  // Set the role to admin
    });

    await adminUser.save();
    console.log('Admin user created');
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
