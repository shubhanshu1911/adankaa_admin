const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your Account Credentials',
        text: `Your account has been created. Password: ${password}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
