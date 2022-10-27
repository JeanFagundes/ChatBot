/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

module.exports = async function receiveMessage(receive) {
  const token = process.env.TOKEN;

  console.log('por dentro da função');
  console.log(receive.msg_body);
  console.log(receive);

  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: receive.from,
    type: 'text',
    text: {
      body: receive.msg_body,
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

  try {
    const resp = await axios(config);
    return resp.data;
  } catch (e) {
    // console.error(e);
    console.error(e.response.status);
    console.error(e.response.data);
    console.error(e.response.headers);
  }
  return 'é rapai';
};
