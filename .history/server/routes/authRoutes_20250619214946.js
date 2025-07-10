const express = require('express');
const auth = require('../middleware/auth');
const { getMe, register, login, refresh, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', auth, getMe);

module.exports = router;
