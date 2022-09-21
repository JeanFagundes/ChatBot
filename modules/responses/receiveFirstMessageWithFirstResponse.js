/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

module.exports = async function receivefirstMessageWithFirstMessage(
  resp,
  body_param,
) {
  // criar um middleware para receber a reposta e enviar para essa função
  const token = process.env.TOKEN;

  const { answer } = body_param;

  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: resp.data.contacts[0].input,
    context: {
      message_id: resp.data.messages[0].id,
    },
    type: 'text',
    text: {
      body: answer,
    },
  });

  const config = {
    method: 'POST',
    url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return msg_body;
};
