const sendMessage = require('../modules/SendMessage');
const sendMessageButton = require('../modules/SendMessageWithButton');
const ReceiveMessage = require('../modules/ReceiveMessage');
const ReceiveMessageConstructor = require('../modules/class/ReceiveMessageConstructor');
// const receiveFirstResponse = require('../modules/responses/receiveFirstResponse');

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
    let receive = new ReceiveMessageConstructor();

    if (
      !body_param.entry[0].changes[0].value.messages[0].interactive.buttonReply
        .id
    ) {
      receive = new ReceiveMessageConstructor(
        body_param.entry[0].changes[0].value.messages[0].text.body,
        body_param.entry[0].changes[0].value.metadata.phone_number_id,
        body_param.entry[0].changes[0].value.messages[0].from,
      );
    }

    // const receive = new ReceiveMessageConstructor(
    //   body_param.entry[0].changes[0].value.messages[0].text.body || undefined,
    //   body_param.entry[0].changes[0].value.messages[0].interactive.buttonReply
    //     .id || undefined,
    //   body_param.entry[0].changes[0].value.metadata.phone_number_id,
    //   body_param.entry[0].changes[0].value.messages[0].from,
    // );
    receive.validacoes();

    const result = await ReceiveMessage(receive);

    res.send(result);
    // if (body_param.object) {
    //   console.log('inside body param');

    //   if (
    //     body_param.entry &&
    //     body_param.entry[0].changes &&
    //     body_param.entry[0].changes[0].value.messages &&
    //     body_param.entry[0].changes[0].value.messages[0]
    //   ) {
    //     const msg_body =
    //       body_param.entry[0].changes[0].value.messages[0].text.body;
    //     const phon_no_id =
    //       body_param.entry[0].changes[0].value.metadata.phone_number_id;
    //     const { from } = body_param.entry[0].changes[0].value.messages[0];
    //   }
    // }
  }

  static async receiveFirstResponse(req, res) {
    const response = req.params;
    res.send(response);
  }

  static async homePage(req, res) {
    res.status(200).send('Wellcome');
  }
};
