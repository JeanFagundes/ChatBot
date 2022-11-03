const sendMessage = require('../modules/SendMessage');
const sendMessageButton = require('../modules/FirstMessage/startingChat');
const ReceiveMessage = require('../modules/ReceiveMessage/ReceiveMessage');
// const webhookVerification = require('../modules/webhookVerification');
// const sendAnswerWithButton = require('../modules/SendAnswerWithButton');
// const receiveFirstResponse = require('../modules/responses/receiveFirstResponse');

module.exports = class MessagesController {
  // static async webhook(req, res) {
  //   const result = await webhookVerification(req);
  //   return res.send(result);
  // }

  static async sendInitialMessage(req, res) {
    // const body_param = ({} = req.body);
    // const number = 5511954406674;
    const { number } = req.body;
    const result = await sendMessage(number);
    res.send(result);
  }

  // static async sendAnswerWithButton(req, res) {
  //   const result = await sendAnswerWithButton();
  //   return res.send(result);
  // }

  static async sendMessagesWithButton(req, res) {
    const { number } = req.body;
    const result = await sendMessageButton(number);
    res.send(result);
  }

  static async receiveMessage(req, res) {
    const body_param = await req.body;
    // console.log(JSON.stringify(body_param, null, 2));

    if (body_param.object) {
      if (
        body_param.entry &&
        body_param.entry[0].changes &&
        body_param.entry[0].changes[0].value.messages &&
        body_param.entry[0].changes[0].value.messages[0]
      ) {
        const result = await ReceiveMessage(body_param);
      }
    }
    return res.send('Tudo certo');
  }

  static async receiveFirstResponse(req, res) {
    const response = req.params;
    res.send(response);
  }

  static async homePage(req, res) {
    res.status(200).send('Wellcome');
  }
};
