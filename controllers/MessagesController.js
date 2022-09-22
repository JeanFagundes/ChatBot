/* eslint-disable no-empty-pattern */
/* eslint-disable no-multi-assign */
/* eslint-disable camelcase */
const sendMessage = require('../modules/SendMessage');
const sendMessageButton = require('../modules/SendMessageWithButton');
const ReceiveMessage = require('../modules/ReceiveMessage');

module.exports = class MessagesController {
  static async sendInitialMessage(req, res) {
    // const body_param = ({} = req.body);
    // const number = 5511954406674;
    const { number } = req.body;
    const result = await sendMessage(number);
    res.send(result);
  }

  static async sendMessagesWithButton(req, res) {
    const { number } = req.body;
    const result = await sendMessageButton(number);
    res.send(result);
  }

  static async receiveMessage(req, res) {
    const body_param = await req.body;

    const result = await ReceiveMessage(body_param);
    res.send(result);
  }

  static async receiveFirstResponse(req, res) {
    const response = req.params;
    res.send(response);
  }

  static async homePage(req, res) {
    res.status(200).send('Wellcome');
  }
};
