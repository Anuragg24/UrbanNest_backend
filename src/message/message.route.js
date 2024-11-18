const express = require('express');
const router = express.Router();
const Message = require('./message.model');
const verifyToken = require("../users/middleware/verifyToken")

// Get all messages for the logged-in user
router.get('/messages/:id', verifyToken, async (req, res) => {
    const {id} = req.params; // Extracted by verifyToken

    try {
        const messages = await Message.find({ id }).sort({ createdAt: -1 });
        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// POST route to submit a message
router.post('/contact', verifyToken, async (req, res) => {
    const { name, email, message } = req.body;
    const userId = req.userId; // Extracted by verifyToken

    try {
        const newMessage = new Message({ name, email, message, userId });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

module.exports = router;
