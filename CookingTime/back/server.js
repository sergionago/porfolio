// Starting server resources
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const { connectDB, closeConn } = require('./config/mongo_config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware to json parsing
app.use(express.json());

//CORS
app.use(cors());
const corsOptions = {
    origin: process.env.CLIENT_URI,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes resources
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// MongoDB connection
connectDB();

// Calls to the routes handler
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/upload', uploadRoutes);

// Middleware to serve the static resources (images in public directory)
app.use('/back/public', express.static(path.join(__dirname, 'public')))

// Server starter
app.listen(PORT, () => {
    console.log(`Server listening in port: ${PORT}`);
});