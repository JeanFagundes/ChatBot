require('dotenv').config();

module.exports = async function receiveMessage() {



  console.log('entrou aqui');
  const mode = req.query['hub.mode'];
  const challange = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode && token) {
    console.log('entrou no if do get /webhook');

    if (mode === 'subscribe' && token === mytoken) {
      console.log('status 200 do get /webhook');
      return res.status(200).send(challange, 'hello');
    }
    console.log('status 403 do get /webhook');
    return res.status(403).send('Acess denied');
  }
};
