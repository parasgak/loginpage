const express = require('express');
const {
    register,
    verifyOTP,
    login,
    getProfile,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
