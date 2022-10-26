const express = require('express');

const router = express.Router();
const MessagesController = require('../controllers/MessagesController');

router.post('/sendMessage', MessagesController.sendInitialMessage);
router.post('/sendMessageButton', MessagesController.sendMessagesWithButton);
// router.post('/webhook', MessagesController.receiveMessage);

router.get('/', MessagesController.homePage);
module.exports = router;
