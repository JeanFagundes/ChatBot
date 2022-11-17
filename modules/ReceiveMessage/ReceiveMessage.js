const { PrismaClient } = require('@prisma/client');

const fs = require('fs');

const prisma = new PrismaClient();

const SendAnswerWithButton = require('../SendAnswerWithButton');
const SendAnswerWithText = require('../SendAnswerWithText');

require('dotenv').config();

module.exports = async function receiveMessage(body_param) {
  console.log(body_param);

  const typeMessage = body_param.entry[0].changes[0].value.messages[0].type;

  if (typeMessage === 'text') {
    // ainda não sei o que fazer, vamos lutando
    const message = JSON.stringify(body_param, null, 2);
    const answer = body_param.entry[0].changes[0].value.messages[0].text.body;
    console.log(answer);
    console.log(message);
    const id = body_param.entry[0].changes[0].value.contacts[0].wa_id;
    console.log(id);

    return answer;
  }
  if (typeMessage === 'interactive') {
    const message = JSON.stringify(body_param, null, 2);
    let answer;
    try {
      answer =
        body_param.entry[0].changes[0].value.messages[0].interactive
          .button_reply.id;
    } catch (error) {
      console.log(error.message);
      answer =
        body_param.entry[0].changes[0].value.messages[0].interactive.list_reply
          .id;
    }

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
            text: 'Perfeito, vamos começar. \n Qual será a forma de retirada dos equipamentos ?',
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
    }
    if (answer === 'devolucaoEscritorio') {
      const data = JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: from,
        type: 'interactive',
        interactive: {
          type: 'list',
          header: {
            type: 'text',
            text: 'Escritórios',
          },
          body: {
            text: 'Em qual escritório será feito a devolução ?',
          },
          action: {
            button: 'Escritórios',
            sections: [
              {
                title: 'Escritorios',
                rows: [
                  {
                    id: 'barao',
                    title: 'Barao de Limeira - SP',
                    description: 'Al. Barão de Limeira 458 - Campos Elíseos',
                  },
                  {
                    id: 'fariaLima',
                    title: 'Faria Lima - SP',
                    description:
                      'Av. Brigadeiro Faria Lima 1384 - Jd. Paulistano',
                  },
                  {
                    id: 'minasGerais',
                    title: 'Belo Horizonte - MG',
                    description: 'Rua Jaceguai 208, Sala 1215 - Prado',
                  },
                  {
                    id: 'rioDeJaneiro',
                    title: 'Rio de Janeiro',
                    description: ' Av Treze de Maio, 23 - 2 andar - sala D',
                  },
                  {
                    id: 'goiania',
                    title: 'Tilix Goiania',
                    description: 'Av. Dep. Jamel Cecílio, 2690, 11º Andar',
                  },
                  {
                    id: 'maringa',
                    title: 'Maringa - PR',
                    description:
                      'Av. Bento Munhoz da Rocha Neto 632, Salas 1006-1008, 10nd - Zona 7',
                  },
                  {
                    id: 'portoAlegre                                                                ',
                    title: 'Porto Alegre',
                    description:
                      'Av. Ipiranga 6681, Prédio 96B, Sl 201 - Partenon',
                  },
                ],
              },
            ],
          },
        },
      });

      await SendAnswerWithButton(data);
    }
    if (answer === 'fariaLima' || answer === 'barao') {
      const message2 = JSON.stringify(body_param, null, 2);

      console.log(message2);

      const data = JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: from,
        type: 'text',
        text: {
          body: `Você escolheu fazer a entrega dos equipamentos no escritório do(a) ${answer}.\n
          Que dia será feito a devolução ?`,
        },
      });

      const validarPergunta = 'Agendar dia da entrega presencial';

      await SendAnswerWithText(data, validarPergunta);
    }

    return answer;
  }
  return new Error(`Tipo de mensagem invalido ${typeMessage}`);
};
