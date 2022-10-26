require('dotenv').config();

module.exports = async function webhook(req) {
  const mytoken = process.env.MYTOKEN;

  console.log('entrou aqui');
  const mode = req.query['hub.mode'];
  const challange = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];
  if (mode && token) {
    console.log('entrou no if do get /webhook');

    if (mode === 'subscribe' && token === mytoken) {
      console.log('status 200 do get /webhook');
      // return res.status(200).send(challange, 'hello');
      return challange;
    }
    console.log('status 403 do get /webhook');
    return 'Acess denied';
  }
  return 'no webhook enviado';
};
