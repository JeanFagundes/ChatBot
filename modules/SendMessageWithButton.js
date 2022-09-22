/* eslint-disable camelcase */
const axios = require('axios');
const receiveFirstResponse = require('./responses/receiveFirstResponse');
// const receivefirstMessageWithFirstMessage = require('./responses/receiveFirstMessageWithFirstMessage');

require('dotenv').config();

module.exports = async function sendMessageButton(number) {
  const token = process.env.TOKEN;

  // if (body_param.object) {
  console.log('inside body param');

  // if (
  //   body_param.entry &&
  //   body_param.entry[0].changes &&
  //   body_param.entry[0].changes[0].value.messages &&
  //   body_param.entry[0].changes[0].value.messages[0]
  // ) {
  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: number,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: 'Ja devolveu a maquina ?',
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: '1',
              title: 'Sim',
            },
          },
          {
            type: 'reply',
            reply: {
              id: '2',
              title: 'Não',
            },
          },
        ],
      },
    },
  };

  const config = {
    method: 'POST',
    url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  console.log('entrou');

  try {
    const resp = await axios(config);
    // console.log(resp.data.messages[0].id);
    // console.log(resp.data);
    console.log('numero da fera ', resp.data.contacts[0].input);
    // const answer = await receivefirstMessageWithFirstMessage(resp);
    // const resposta = await receiveFirstResponse(resp);

    // console.log(resposta);
    return resp.data;
    // return [resp.data, resp.data.messages[0].id];
  } catch (e) {
    console.error(e.message);
    // console.error(e.response.data);
    // console.error(e.response.status);
    // console.error(e.response.headers);
  }

  return 'Não foi possivel fazer a requisição';
};
// }
// };
