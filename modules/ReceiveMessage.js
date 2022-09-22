/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

module.exports = async function receiveMessage(body_param) {
  const token = process.env.TOKEN;

  console.log(JSON.stringify(body_param, null, 2));

  // if (body_param.object) {
  //   console.log('inside body param');

  //   if (
  //     body_param.entry &&
  //     body_param.entry[0].changes &&
  //     body_param.entry[0].changes[0].value.messages &&
  //     body_param.entry[0].changes[0].value.messages[0]
  //   ) {
  //     console.log('entrou no segundo if');

  //     const msg_body =
  //       body_param.entry[0].changes[0].value.messages[0].text.body;
  //     const phon_no_id =
  //       body_param.entry[0].changes[0].value.metadata.phone_number_id;
  //     const { from } = body_param.entry[0].changes[0].value.messages[0];
  //     console.log(`phone number ${phon_no_id}`);
  //     console.log(`from ${from}`);
  //     console.log(`body param ${msg_body}`);

  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: 5511954406674,
    type: 'text',
    text: {
      body: 'msg_body',
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
    console.error(e);
    console.error(e.response.status);
    console.error(e.response.data);
    console.error(e.response.headers);
  }
  return 'é rapai';
};
//  else {
//   return 'nenhum corpo de mensagem';
// }
//   }
//   return 'nenhuma mensagem por enquanto';
// };
