const express = require('express');

const { PORT } = require('dotenv').config({
    path:'./dev.env'
})
const app = express();

const photoRoutes = require('./routes/photoRoutes');
require('./config/db');
const userRoutes = require('./routes/userRoutes')
const authMiddleware = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const favoriteRoutes = require('./routes/favoritesRoutes')
const User = require('./models/userModel');
app.use(express.json());

app.use('/api/photos', photoRoutes);
app.use(userRoutes);
app.use(favoriteRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the Unsplash API!" });
});

// Private /me route
app.get('/me', authMiddleware, async (req, res) => {
  try {
    // Get user ID from decoded token
    const { userId } = req;

    // Find user in database
    const user = await User.findById(userId);

    // Return user information
    res.json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);

