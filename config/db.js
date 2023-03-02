const mongoose = require('mongoose');
require('dotenv').config({
    path:'./dev.env'
})
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));