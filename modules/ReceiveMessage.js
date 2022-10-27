/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

module.exports = async function receiveMessage(body_param) {
  const token = process.env.TOKEN;

  console.log(body_param);

  const typeMessage = body_param.entry[0].changes[0].value.messages[0].type;

  if (typeMessage === 'text') {
    return 'seloco';
  }
  if (typeMessage === 'interactive') {
    const message = JSON.stringify(body_param, null, 2);
    console.log(message);
    console.log(body_param.entry[0].changes[0].value.messages[0].context.id);
    return 'Deu certo a tipagem';
  }
  return new Error(`Tipo de mensagem invalido${typeMessage}`);

  // const data = JSON.stringify({
  //   messaging_product: 'whatsapp',
  //   recipient_type: 'individual',
  //   to: body_param.entry[0].changes[0].value.messages[0].from,
  //   type: 'text',
  //   text: {
  //     body: body_param.entry[0].changes[0].value.messages[0].text.body,
  //   },
  // });
  // const config = {
  //   method: 'POST',
  //   url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   data,
  // };

  // try {
  //   const resp = await axios(config);
  //   return resp.data;
  // } catch (e) {
  //   // console.error(e);
  //   console.error(e.response.status);
  //   console.error(e.response.data);
  //   console.error(e.response.headers);
  // }
  // return 'é rapai';
};
