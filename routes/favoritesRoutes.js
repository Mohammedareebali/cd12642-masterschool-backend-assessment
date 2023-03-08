const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const  {addFavorite,getFavorite,removeFavorite,editFavorite}  = require('../controllers/favoritesController');

router.post('/:username/add', authMiddleware,addFavorite);
router.delete('/:username/:photoId',authMiddleware,removeFavorite);
router.get('/:username',authMiddleware,getFavorite);
router.put('/:username/:photoId',authMiddleware,editFavorite)
module.exports = router;
