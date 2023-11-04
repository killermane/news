// config/database.js
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your MySQL database information
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;
