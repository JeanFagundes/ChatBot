/* eslint-disable camelcase */
const axios = require('axios');

require('dotenv').config();

module.exports = async function sendAnswerWithButton(data) {
  const token = process.env.TOKEN;

  console.log('inside body param');

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

    return { data: resp.data };
  } catch (e) {
    console.error(e.message);
  }

  return 'Não foi possivel fazer a requisição';
};
