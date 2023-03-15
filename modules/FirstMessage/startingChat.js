/* eslint-disable camelcase */
const axios = require('axios');

require('dotenv').config();

module.exports = async function sendMessageButton(number) {
  // Adicionar a leitura de excel aqui

  const token = process.env.TOKEN;
  // const phoneid = process.env.PHONEID;

  console.log('Executando modulo startingChat');

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: number,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: ' Ola { Silas }, tudo bem ? Sou { Migui } o chatbot do suporte corporativo do grupo UOL. Estou em contato pois temos equipamentos com termo de compromisso ativo em seu nome, gostaria de agendar a devolução dos equipamentos. Podemos começar ?',
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'startingChat',
              title: 'Começar',
            },
          },
        ],
      },
    },
  };

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
