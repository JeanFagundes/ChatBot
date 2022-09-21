/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

module.exports = async function receivefirstMessageWithFirstMessage(resp) {
  const token = process.env.TOKEN;

  console.log('entrou no segundo if');

  console.log(`phone number ${phon_no_id}`);
  console.log(`from ${to}`);
  console.log(`body param ${msg_body}`);

  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: resp.data.contacts[0].input,
    context: {
      message_id: resp.data.messages[0].id,
    },
    type: 'text',
    text: {
      body: msg_body,
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
