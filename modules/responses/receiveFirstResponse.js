/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

module.exports = async function receiveFirstResponse(resp) {
  const token = process.env.TOKEN;

  const message_id = resp.data.messages[0].id;

  console.log(`message_id = ${message_id}`);

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: resp.data.contacts[0].input,
    context: {
      message_id,
    },
    type: 'text',
    text: {
      body: 'Não',
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

  try {
    const resp1 = await axios(config);

    if (data.text.body === 'Não') {
    }
  } catch (e) {
    console.error(e);
    // console.error(e.response.status);
    // console.error(e.response.data);
    // console.error(e.response.headers);
  }
  return 'não foi possivel obter a resposta';
};
