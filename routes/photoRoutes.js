const axios = require('axios');
const express = require('express');
const { rawPhotoUrl, photoBasedId, photoBasedUsername } = require('../controllers/photoController');
const router = express.Router();

// Route to get an array of raw Unsplash photo URLs
router.get('/', rawPhotoUrl);

// Route to get a single photo object from the Unsplash API based on a photo's id
router.get('/:id', photoBasedId);

// Route to get a user's Unsplash photos based on a username
router.get('/user/:username', photoBasedUsername);
  
module.exports = router;
