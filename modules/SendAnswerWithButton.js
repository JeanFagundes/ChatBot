/* eslint-disable camelcase */
const axios = require('axios');

require('dotenv').config();

module.exports = async function sendAnswerWithButton(data) {
  const token = process.env.TOKEN;
  const phoneid = process.env.PHONEID;

  console.log('Enviando resposta do menu de opções');

  const config = {
    method: 'POST',
    url: `https://graph.facebook.com/v14.0/${phoneid}/messages?access_token=${token}`,
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
    return e.message;
  }
};
