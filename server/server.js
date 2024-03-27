const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE;
const app = express();

app.use(express.json());

// Routes
app.use('/', authRoutes);


// Connect to MongoDB
mongoose.connect(DB)
  .then(() => {
    console.log('Database is connected');
    // Start the server
    // app.listen(PORT, () => {
    //   console.log(`Server is listening on port ${PORT}`);
    // });
  })
  .catch(err => console.error('Database connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes


