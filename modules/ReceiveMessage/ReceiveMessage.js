const SendAnswerWithButton = require('../SendAnswerWithButton');

/* eslint-disable camelcase */
require('dotenv').config();

module.exports = async function receiveMessage(body_param) {
  console.log(body_param);

  const typeMessage = body_param.entry[0].changes[0].value.messages[0].type;

  if (typeMessage === 'text') {
    // ainda não sei o que fazer, vamos lutando

    const answer = body_param.entry[0].changes[0].value.messages[0].text.body;
    return answer;
  }
  if (typeMessage === 'interactive') {
    const message = JSON.stringify(body_param, null, 2);
    const answer =
      body_param.entry[0].changes[0].value.messages[0].interactive.button_reply
        .id;
    const { from } = body_param.entry[0].changes[0].value.messages[0];
    console.log(message);
    console.log(answer);

    if (answer === 'startingChat') {
      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: from,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: {
            text: 'Perfeito, vamos começar',
          },
          action: {
            buttons: [
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoEscritorio',
                  title: 'Agendar devolução no escritório',
                },
              },
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoRetirada',
                  title: 'Agendar retirada do equipamento',
                },
              },
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoRealizada',
                  title: 'Já realizei a devolução',
                },
              },
            ],
          },
        },
      };
      SendAnswerWithButton(data);
    } else if (answer === 'devolucaoEscritorio') {
      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: from,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: {
            text: 'Em qual escritório será feito a devolução ?',
          },
          action: {
            buttons: [
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoEscritorio',
                  title: 'Agendar devolução no escritório',
                },
              },
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoRetirada',
                  title: 'Agendar retirada do equipamento',
                },
              },
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoRealizada',
                  title: 'Já realizei a devolução',
                },
              },
            ],
          },
        },
      };
    }

    return answer;
  }
  return new Error(`Tipo de mensagem invalido ${typeMessage}`);
};
