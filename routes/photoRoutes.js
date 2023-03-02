const axios = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config({
    path:'./dev.env'
})

const unsplashBaseUrl = 'https://api.unsplash.com';
const unsplashAccessKey = process.env.ACCESS_KEY; 

// Route to get an array of raw Unsplash photo URLs
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${unsplashBaseUrl}/photos`, {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
    });
    const photoUrls = response.data.map((photo) => photo.urls.raw);
    res.status(200).json(photoUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Route to get a single photo object from the Unsplash API based on a photo's id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${unsplashBaseUrl}/photos/${id}`, {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
// Route to get a user's Unsplash photos based on a username
router.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const response = await axios.get(`${unsplashBaseUrl}/users/${username}/photos`, {
        headers: {
          Authorization: `Client-ID ${unsplashAccessKey}`,
        },
      });
      const photos = response.data.map((photo) => {
        return {
          id: photo.id,
          username: photo.user.username,
          description: photo.description ? photo.description : "No description provided.",
          url: photo.urls.raw,
        };
      });
      res.status(200).json(photos);
    } catch (error) {
      console.error(error);
      res.status(error.response.status).json({ message: error.response.data });
    }
  });
  
module.exports = router;
