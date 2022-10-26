const sendMessage = require('../modules/SendMessage');
const sendMessageButton = require('../modules/SendMessageWithButton');
const ReceiveMessage = require('../modules/ReceiveMessage');
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
    // console.log(JSON.stringify(body_param, null, 2));

    if (body_param.object) {
      console.log('inside body param');

      if (
        body_param.entry &&
        body_param.entry[0].changes &&
        body_param.entry[0].changes[0].value.messages &&
        body_param.entry[0].changes[0].value.messages[0]
      ) {
        // try {
        //   if (
        //     body_param.entry[0].changes[0].value.messages[0].text.body !==
        //     'undefined'
        //   ) {
        //     body = body_param.entry[0].changes[0].value.messages[0].text.body;
        //   } else if (
        //     body_param.entry[0].changes[0].value.messages[0].interactive
        //       .button_reply.id !== 'undefined'
        //   ) {
        //     body =
        //       body_param.entry[0].changes[0].value.messages[0].interactive
        //         .button_reply.id;
        //   }
        // } catch (error) {
        //   console.log(error.message);
        // }

        const number =
          body_param.entry[0].changes[0].value.metadata.phone_number_id;
        const { from } = body_param.entry[0].changes[0].value.messages[0];

        receive = new ReceiveMessageConstructor(body, number, from);
        const result = await ReceiveMessage(receive);

        console.log('receive parametros', receive.msg_body);

        // const receive = new ReceiveMessageConstructor(
        //   body_param.entry[0].changes[0].value.messages[0].text.body || undefined,
        //   body_param.entry[0].changes[0].value.messages[0].interactive.button_reply
        //     .id || undefined,
        //   body_param.entry[0].changes[0].value.metadata.phone_number_id,
        //   body_param.entry[0].changes[0].value.messages[0].from,
        // );
        // receive.validacoes();

        res.send(result);
      } else {
        res.send('Sem Parametros nenhum');
      }
    } else {
      res.send('Sem parametros');
    }
  }

  static async receiveFirstResponse(req, res) {
    const response = req.params;
    res.send(response);
  }

  static async homePage(req, res) {
    res.status(200).send('Wellcome');
  }
};
