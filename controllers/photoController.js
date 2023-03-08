//Require axios to make API calls
const axios = require("axios");
const unsplashBaseUrl = 'https://api.unsplash.com';
const unsplashAccessKey = process.env.ACCESS_KEY; 
require('dotenv').config({
    path:'../dev.env'
})
//rawPhotoUrl
const rawPhotoUrl = async (req, res) => {
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
  }
  // photoBasedId
  const photoBasedId = async (req, res) => {
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
  }
  //photoBasedUsername
  const photoBasedUsername = async (req, res) => {
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
      
      if (error.response) {
        res.status(error.response.status).json({ message: error.response.data });
      } else {
        res.status(500).json({ message: "Network error. Please check your internet connection." });
      }
    }
  }

  module.exports ={
    rawPhotoUrl,photoBasedId,photoBasedUsername
  }
