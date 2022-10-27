/* eslint-disable camelcase */
const axios = require('axios');
const receiveFirstResponse = require('./responses/receiveFirstResponse');
// const receivefirstMessageWithFirstMessage = require('./responses/receiveFirstMessageWithFirstMessage');

require('dotenv').config();

module.exports = async function sendMessageButton(number) {
  const token = process.env.TOKEN;

  console.log('inside body param');

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
              id: 'First question',
              title: 'Sim',
            },
          },
          {
            type: 'reply',
            reply: {
              id: 'First question',
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

    console.log('numero da fera ', resp.data.contacts[0].input);

    return { data: resp.data, question: data.interactive.body.text };
  } catch (e) {
    console.error(e.message);
  }

  return 'Não foi possivel fazer a requisição';
};
