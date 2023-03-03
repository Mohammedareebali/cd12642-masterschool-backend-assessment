const mongoose = require('mongoose');

const favoritePhotoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  username: {
    type: String,
    required: true,
  },
  explanation: { type: String }
});

const FavoritePhoto = mongoose.model('FavoritePhoto', favoritePhotoSchema);

module.exports = FavoritePhoto;
