/* eslint-disable camelcase */
const axios = require('axios');

require('dotenv').config();

module.exports = async function sendAnswerWithButton(data) {
  const token = process.env.TOKEN;
  // const phoneid = process.env.PHONEID;

  console.log('Enviando resposta do menu de opções');

  const config = {
    method: 'POST',
    url: `https://graph.facebook.com/v15.0/103734019157955/messages`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data,
  };
  console.log(data);

  try {
    const resp = await axios(config);
    return resp.data;
  } catch (e) {
    return e.message;
  }
};
