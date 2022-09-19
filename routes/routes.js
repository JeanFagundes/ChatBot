const express = require('express');

const router = express.Router();
const MessagesController = require('../controllers/MessagesController');

router.post('/webhook', MessagesController.sendInitialMessage);
router.post('/sendMessageButton', MessagesController.sendMessagesWithButton);

router.post('/receiveMessage', MessagesController.receiveMessage);

module.exports = router;
