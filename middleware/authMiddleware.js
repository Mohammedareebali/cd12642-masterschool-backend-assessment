const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('dotenv').config({
    path:'../dev.env'
});

function authMiddleware(req, res, next) {
  // Get the token from the request header
  const token = req.headers.authorization?.split(' ')[1];
    // Verify the token with the JWT_SECRET and attach the user to the request object
    console.log(JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
}

module.exports = authMiddleware;
