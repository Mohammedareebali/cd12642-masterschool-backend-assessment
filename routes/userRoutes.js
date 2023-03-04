const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const TokenBlacklist = require('../models/TokenBlacklist');
const { register, login, logout } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login',login);
router.post('/logout', logout);

module.exports = router;
