const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { createUser, managePermissions, getUsers } = require('../controllers/adminController');

// Route to fetch all users
router.get('/users', authMiddleware, adminMiddleware, getUsers);

router.post('/create-user', authMiddleware, adminMiddleware, createUser);
router.post('/manage-permissions', authMiddleware, adminMiddleware, managePermissions);

module.exports = router;
