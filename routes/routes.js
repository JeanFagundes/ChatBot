const express = require('express');

const router = express.Router();
const MessagesController = require('../controllers/MessagesController');

router.post('/webhook', MessagesController.sendInitialMessage);
router.post('/sendMessageButton', MessagesController.sendMessagesWithButton);

module.exports = router;
