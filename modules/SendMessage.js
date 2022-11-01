const axios = require('axios');
require('dotenv').config();

module.exports = async function sendMessage(number) {
  const token = process.env.TOKEN;
  const phoneid = process.env.PHONEID;

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
    console.error(e.response.data);
    console.error(e.response.status);
    console.error(e.response.headers);
  }
  return `não foi possivel enviar a mensagem para o numero ${number}`;
};
// return 'não tem parametro no corpo';
//   }
//   return 'Não tem objeto';
// };
