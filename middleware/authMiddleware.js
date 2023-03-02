const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('dotenv').config({
    path:'./dev.env'
})

function authMiddleware(req, res, next) {
  // Get the token from the request header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    // Verify the token with the JWT_SECRET and attach the user to the request object
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
}

module.exports = authMiddleware;
