const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const  addFavorites  = require('../controllers/favoritesController').addFavorite;
const getFavorite = require('../controllers/favoritesController').getFavorite;
const removeFavorite = require('../controllers/favoritesController').removeFavorite;
const editFavorite = require('../controllers/favoritesController').editFavorite;
// @route   POST /favorite-photos
// @desc    Add photo to favorite photos collection
// @access  Private
router.post('/:username/add', authMiddleware,addFavorites);
router.get('/:username/:photoId',authMiddleware,removeFavorite);
router.get('/:username',authMiddleware,getFavorite);
router.put('/:username/:photoId',authMiddleware,editFavorite)
module.exports = router;
