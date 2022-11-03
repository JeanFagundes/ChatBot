const { json } = require('body-parser');
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
      const data = JSON.stringify({
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
                  title: 'presencial',
                },
              },
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoRetirada',
                  title: 'Retirada',
                },
              },
              {
                type: 'reply',
                reply: {
                  id: 'devolucaoRealizada',
                  title: 'realizado',
                },
              },
            ],
          },
        },
      });
      await SendAnswerWithButton(data);
    } else if (answer === 'devolucaoEscritorio') {
      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: from,
        type: 'interactive',
        interactive: {
          type: 'list',
          header: {
            type: 'text',
            text: 'testando header',
          },
          body: {
            text: 'Em qual escritório será feito a devolução ?',
          },
          action: {
            button: 'button_text',
            sections: [
              {
                title: 'Escritorios',
                rows: [
                  {
                    id: 'barao',
                    title: 'Barao de Limeira - SP',
                    description:
                      'Al. Barão de Limeira 458 - Campos Elíseos - São Paulo - 01202-001',
                  },
                  {
                    id: 'fariaLima',
                    title: 'Faria Lima - SP',
                    description:
                      'Av. Brigadeiro Faria Lima 1384 - Jd. Paulistano - São Paulo - 01452-002',
                  },
                  {
                    id: 'minasGerais',
                    title: 'Belo Horizonte - MG',
                    description:
                      'Rua Jaceguai 208, Sala 1215 - Prado - Belo Horizonte - 30411-020',
                  },
                  {
                    id: 'rioDeJaneiro',
                    title: 'Rio de Janeiro',
                    description:
                      'RJ: Av Treze de Maio, 23 - 2 andar - sala D - Rio de Janeiro - 20031-007',
                  },
                  {
                    id: 'goiania',
                    title: 'Tilix Goiania',
                    description:
                      'Av. Dep. Jamel Cecílio, 2690, 11º Andar - Goiania - 74810-100',
                  },
                  {
                    id: 'maringa',
                    title: 'Maringa - PR',
                    description:
                      'Av. Bento Munhoz da Rocha Neto 632, Salas 1006-1008, 10nd - Zona 7 - Parana - 87030-010',
                  },
                  {
                    id: 'portoAlegre                                                                ',
                    title: 'Porto Alegre',
                    description:
                      'Av. Ipiranga 6681, Prédio 96B, Sl 201 - Partenon - Porto alegre RS - 90160-092',
                  },
                ],
              },
            ],
          },
        },
      };
      await SendAnswerWithButton(data);
    } else if (answer === 'fariaLima') {
      const message2 = JSON.stringify(body_param, null, 2);

      console.log(message2);
    }

    return answer;
  }
  return new Error(`Tipo de mensagem invalido ${typeMessage}`);
};
