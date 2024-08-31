const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    permissions: {
        romoBasic: { type: Boolean, default: false },
        romoAdvanced: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model('User', UserSchema);


// ishankhare30
// 22Lf46riXiWR8rva