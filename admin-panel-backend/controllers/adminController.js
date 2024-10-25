const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/sendEmail'); // Adjust the path as necessary

// Controller to create a new user
exports.createUser = async (req, res) => {
  const { email, password, role, permissions } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ email, password: hashedPassword, role, permissions });
    await user.save();

    // Send email to the user
    try {
      await sendEmail(email, password);
      res.status(201).json({ message: 'User created successfully and email sent' });
    } catch (emailErr) {
      console.error('Email failed to send:', emailErr);
      res.status(201).json({ message: 'User created successfully, but email failed to send' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller to fetch all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to manage permissions
exports.managePermissions = async (req, res) => {
  const { userId, permissions } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.permissions = permissions;
    await user.save();

    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
