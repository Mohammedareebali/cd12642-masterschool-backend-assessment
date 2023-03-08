const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const { JWT_SECRET } = require('dotenv').config({
    path:'../dev.env'
});

const BlacklistedToken = require('../models/TokenBlacklist'); // import your BlacklistedToken model

const authMiddleware = asyncHandler( async (req, res, next) =>{
  // Get the token from the request header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is blacklisted
  const isBlacklisted = await BlacklistedToken.findOne({ token }).exec();
  if (isBlacklisted) {
    return res.status(401).json({ error: 'the Invalid token' });
  }

  
    // Verify the token with the JWT_SECRET and attach the user to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();

});

module.exports = authMiddleware;
