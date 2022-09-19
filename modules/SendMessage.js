/* eslint-disable camelcase */
const axios = require('axios');
require('dotenv').config();

module.exports = async function sendMessage(number) {
  const token = process.env.TOKEN;

  // if (body_param.object) {
  //   console.log('inside body param');

  //   if (
  //     body_param.entry &&
  //     body_param.entry[0].changes &&
  //     body_param.entry[0].changes[0].value.messages &&
  //     body_param.entry[0].changes[0].value.messages[0]
  //   ) {
  //     console.log('entrou no segundo if');

  // const msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
  // const phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
  // const { from } = body_param.entry[0].changes[0].value.messages[0];
  // console.log(`phone number ${phon_no_id}`);
  // console.log(`from ${from}`);
  // console.log(`body param ${msg_body}`);

  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: number,
    type: 'text',
    text: {
      body: 'Boa noite Marilene',
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
    console.error(e.response.data);
    console.error(e.response.status);
    console.error(e.response.headers);
  }
};
// return 'não tem parametro no corpo';
//   }
//   return 'Não tem objeto';
// };
