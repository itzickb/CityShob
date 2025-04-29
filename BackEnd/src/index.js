require('dotenv').config();          // קורא את משתני הסביבה
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 1. קוראים ל־URI מה־.env
const mongoUri = process.env.MONGO_URI;

// 2. מתחברים ל-MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('✅ MongoDB connected');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// כאן תגדיר את ה-REST API, Socket.IO, וכדומה…

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
