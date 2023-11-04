// server.js
const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const User = require('./models/user');
const Post = require('./models/post');
const Category = require('./models/category');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Test the database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the MySQL database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the MySQL database:', error);
    }
}

testDatabaseConnection();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the News Website API!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Synchronize all models with the database
sequelize.sync({ force: true }).then(() => {
    console.log('All models were synchronized successfully.');
});

// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong on the server.';
    console.error(err.stack);
    res.status(status).json({ error: message });
});