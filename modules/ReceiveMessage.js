const SendAnswerWithButton = require('./SendAnswerWithButton');

/* eslint-disable camelcase */
require('dotenv').config();

module.exports = async function receiveMessage(body_param) {
  console.log(body_param);

  const typeMessage = body_param.entry[0].changes[0].value.messages[0].type;

  if (typeMessage === 'text') {
    const answer = body_param.entry[0].changes[0].value.messages[0].text.body;
    console.log(answer);
  }
  if (typeMessage === 'interactive') {
    const message = JSON.stringify(body_param, null, 2);
    const answer =
      body_param.entry[0].changes[0].value.messages[0].interactive.button_reply
        .id;
    console.log(message);
    console.log(answer);

    if (answer === 'First question') {
      const data = JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: body_param.entry[0].changes[0].value.messages[0].from,
        type: 'text',
        text: {
          body: 'Insira o endereço para retirada',
        },
      });

      SendAnswerWithButton(data);
    }

    return answer;
  }
  return new Error(`Tipo de mensagem invalido ${typeMessage}`);
};
