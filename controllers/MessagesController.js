/* eslint-disable no-empty-pattern */
/* eslint-disable no-multi-assign */
/* eslint-disable camelcase */
const sendMessage = require('../modules/SendMessage');
const sendMessageButton = require('../modules/SendMessageWithButton');

module.exports = class MessagesController {
  static async sendInitialMessage(req, res) {
    // const body_param = ({} = req.body);
    // const number = 5511954406674;
    const { number } = req.body;
    const result = await sendMessage(number);
    res.send(result);
  }

  static async sendMessagesWithButton(req, res) {
    const body_param = ({} = req.body);
    const number = 5511954406674;
    const result = await sendMessageButton(body_param, number);
    res.send(result);
  }
};
