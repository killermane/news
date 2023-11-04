const express = require('express');
const postController = require('../controllers/postController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/', [
    authenticateJWT,
    body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
    body('content').trim().isLength({ min: 20 }).withMessage('Content must be at least 20 characters long'),
    // ... other validations ...
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    postController.createPost(req, res);
});

router.post('/', [authenticateJWT, authorizeRoles('admin')], postController.createPost);
