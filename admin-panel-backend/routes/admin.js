const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { createUser, managePermissions, getUsers } = require('../controllers/adminController');

// Route to fetch all users
router.get('/users', authMiddleware, adminMiddleware, getUsers);

// Route to create a new user
router.post('/create-user', authMiddleware, adminMiddleware, createUser);

// Route to manage permissions
router.put('/manage-permissions', authMiddleware, adminMiddleware, managePermissions);

module.exports = router;
