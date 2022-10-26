/* eslint-disable camelcase */
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express().use(body_parser.json());
app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log('webhook is listening');
});

// to verify the callback url from dashboard side - cloud api side
// eslint-disable-next-line consistent-return
// app.get('/webhook', async (req, res) => {
//   console.log('entrou aqui');
//   const mode = req.query['hub.mode'];
//   const challange = req.query['hub.challenge'];
//   const token = req.query['hub.verify_token'];

//   console.log(mode, challange, token);

//   if (mode && token) {
//     console.log('entrou no if do get /webhook');

//     if (mode === 'subscribe' && token === mytoken) {
//       console.log('status 200 do get /webhook');
//       // return res.status(200).send(challange, 'hello');
//       return res.send(200, challange);
//     }
//     console.log('status 403 do get /webhook');
//     return res.status(403).send('Acess denied');
//   }
// });

// app.post('/webhook', async (req, res) => { // i want some
//   const body_param = req.body;

//   console.log(JSON.stringify(body_param, null, 2));

//   //   console.log(body_param.object, 'body object')
//   // console.log(body_param.entry, 'entry')
//   if (body_param.object) {
//     console.log('inside body param');
//     if (body_param.entry &&
//       body_param.entry[0].changes &&
//       body_param.entry[0].changes[0].value.messages &&
//       body_param.entry[0].changes[0].value.messages[0]
//     ) {
//       console.log('entrou no segundo if');
//       const phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
//       const {
//         from
//       } = body_param.entry[0].changes[0].value.messages[0];
//       let msg_body;

//       if (!body_param.entry[0].changes[0].value.messages[0] ? .text) {
//         msg_body = body_param.entry[0].changes[0].value.messages[0].interactive.button_reply.title;
//       } else if (!body_param.entry[0].changes[0].value.messages[0] ? .interactive.button_reply.title) {
//         msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
//       }
//       // let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body || body_param.entry[0].changes[0].value.messages[0].interactive.button_reply.title;

//       console.log(`phone number ${phon_no_id}`);
//       console.log(`from ${from}`);
//       console.log(`boady param ${msg_body}`);

//       const data = JSON.stringify({
//         messaging_product: 'whatsapp',
//         recipient_type: 'individual',
//         to: from,
//         text: {
//           body: `Hi.. I'm Prasath, your message is ${msg_body}`,
//         },
//       });

//       const config = {
//         method: 'POST',
//         url: `https://graph.facebook.com/v14.0/${phon_no_id}/messages?access_token=${token}`,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         data,
//       };

//       await axios(config);

//       return res.sendStatus(200);
//     }
//     if (body_param.entry &&
//       body_param.entry[0].changes &&
//       body_param.entry[0].changes[0].value.messages &&
//       body_param.entry[0].changes[0].value.messages[0]) {

//     } else {
//       return res.sendStatus(404);
//     }
//   } else {
//     return res.sendStatus(404);
//   }
// });

// // jeito certo de enviar mensagem
// // async function sendMessage(number) {

// //     try {
// //         let resp = await axios({
// //             url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
// //             method: 'post',
// //             data: {
// //                 messaging_product: "whatsapp",
// //                 recipient_type: "individual",
// //                 to: number,
// //                 type: "text",
// //                 text: {
// //                     body: "Augusto é um baitola"
// //                 }
// //             },
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'Authorization': `Bearer ${token}`
// //             }
// //         })

// //         return resp
// //     } catch (e) {

// //         console.error(e);
// //         console.error(e.response.data);
// //         console.error(e.response.status);
// //         console.error(e.response.headers);
// //     }
// // }

// async function sendMessage(response) {
//   const data = JSON.stringify({
//     messaging_product: 'whatsapp',
//     recipient_type: 'individual',
//     to: response.data.contacts[0].input,
//     context: {
//       message_id: response.data.messages[0].id,
//     },
//     type: 'text',
//     text: {
//       preview_url: false,
//       body: 'My Boy',
//     },
//   });

//   const config = {
//     method: 'POST',
//     url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     data,
//   };

//   axios(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// const number = 5511954406674;
// // sendMessage(number);

// app.get('/', (req, res) => {
//   res.status(200).send('hello this is webhook setup');
// });

// async function sendMessageButton(number) {
//   const data = JSON.stringify({
//     messaging_product: 'whatsapp',
//     recipient_type: 'individual',
//     to: number,
//     type: 'interactive',
//     interactive: {
//       type: 'button',
//       body: {
//         text: 'Ja devolveu a maquina ?',
//       },
//       action: {
//         buttons: [{
//             type: 'reply',
//             reply: {
//               id: '1',
//               title: 'Sim',
//             },
//           },
//           {
//             type: 'reply',
//             reply: {
//               id: '2',
//               title: 'Não',
//             },
//           },
//         ],
//       },
//     },
//   });

//   const config = {
//     method: 'POST',
//     url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     data,
//   };

//   console.log('entrou');

//   const resp = await axios(config).then((response) => {
//     console.log(JSON.stringify(response));

//     sendMessage(response);
//   }).catch((e) => {
//     console.log(e.message);
//   });
// }

// sendMessageButton(number)
