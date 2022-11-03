const axios = require('axios');
require('dotenv').config();

module.exports = async function sendMessage(data, validarPergunta) {
  const token = process.env.TOKEN;
  const phoneid = process.env.PHONEID;

  let config = {};

  if (validarPergunta === 'Agendar dia da entrega presencial') {
    config = {
      method: 'POST',
      url: `https://graph.facebook.com/v14.0/${phoneid}/messages`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
    };
  }
  try {
    const resp = await axios(config);
    return resp.data;
  } catch (e) {
    console.error(e.response.data);
    console.error(e.response.status);
    console.error(e.response.headers);
    return console.error(e);
  }
};
// return 'não tem parametro no corpo';
//   }
//   return 'Não tem objeto';
// };
