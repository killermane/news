// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    // Register a new user
    async register(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({ ...req.body, password: hashedPassword });
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // User login
    async login(req, res) {
        try {
            const user = await User.findOne({ where: { username: req.body.username } });
            if (user && await bcrypt.compare(req.body.password, user.password)) {
                // Create a token
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h'
