const asyncHandler = require("express-async-handler");
const FavoritePhoto = require('../models/favoritePhotoModel')
require('dotenv').config({
  path:'../dev.env'
})
const addFavorite = asyncHandler(async (req, res) => {
    const { url, description, username, explanation } = req.body;
    const { userId } = req;
  
    if (!url || !description || !username || !explanation) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }
  
    const newPhoto = new FavoritePhoto({
      user: userId,
      url,
      description,
      username,
      explanation
    });
  
    const savedPhoto = await newPhoto.save();
  
    res.status(200).json(savedPhoto);
  });

const getFavorite = asyncHandler(async (req, res) => {
    const { userId } = req;
    const favoritePhotos = await FavoritePhoto.find({ user: userId });
    res.json(favoritePhotos);
});

const removeFavorite = asyncHandler(async (req, res) => {
    const { userId } = req;
    const { photoId } = req.params;
  
    // Find the favorite photo by ID and user ID
    const favoritePhoto = await FavoritePhoto.findOne({ _id: photoId, user: userId });
  
    // Delete the favorite photo from the database
    await favoritePhoto.remove();
  
    // Return a success message to the client
    res.json({ message: 'Favorite photo removed' });
});

const editFavorite = asyncHandler(async (req, res) => {
    const { userId } = req;
    const { photoId } = req.params;
    const { description } = req.body;
  
    // Find the favorite photo by ID and user ID
    const favoritePhoto = await FavoritePhoto.findOne({ _id: photoId, user: userId });
  
    if (!description) {
      return res.status(400).json({ message: 'Missing required parameter' });
    }
  
    // Update the description of the favorite photo
    favoritePhoto.description = description;
    const updatedPhoto = await favoritePhoto.save();
  
    // Return the updated photo to the client
    res.json(updatedPhoto);
});

module.exports = {
  addFavorite,
  getFavorite,
  removeFavorite,
  editFavorite
};
