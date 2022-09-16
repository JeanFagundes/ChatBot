const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

const app = express().use(body_parser.json());

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN; //prasath_token

app.listen(process.env.PORT, () => {
    console.log("webhook is listening");
});

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook", async (req, res) => {
    console.log('entrou aqui')
    let mode = req.query["hub.mode"];
    let challange = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];


    if (mode && token) {

        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challange, 'hello');
        } else {
            res.status(403);
        }

    }

});

app.post("/webhook", async (req, res) => { //i want some 

    let body_param = req.body;

    console.log(JSON.stringify(body_param, null, 2));

    console.log(body_param.object, 'body object')
    console.log(body_param.entry, 'entry')
    if (body_param.object) {
        console.log("inside body param");
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]
        ) {

            console.log('entrou no segundo if')
            let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].changes[0].value.messages[0].from;
            let msg_body


            if (!body_param.entry[0].changes[0].value.messages[0].text.body) {
                msg_body = "sem corpo";
            } else {
                msg_body = body_param.entry[0].changes[0].value.messages[0].text.body
            }


            console.log("phone number " + phon_no_id);
            console.log("from " + from);
            console.log("boady param " + msg_body);

            const data = JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: from,
                text: {
                    body: "Hi.. I'm Prasath, your message is " + msg_body
                }
            })

            const config = {
                method: "POST",
                url: `https://graph.facebook.com/v14.0/${phon_no_id}/messages?access_token=${token}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: data
            }

            try {
                await axios(config);
            } catch (e) {
                console.error(e);
                console.error(e.response.data);
                console.error(e.response.status);
                console.error(e.response.headers);
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    }

});

//jeito certo de enviar mensagem
async function sendMessage(number) {
    let obj = {
        to: 5511961158907,
        type: "text",
        recipient_type: "individual",
        text: {
            body: "welcome"
        }
    }

    try {
        let resp = await axios({
            url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
            method: 'post',
            data: {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: number,
                type: "text",
                text: {
                    body: "Augusto é um baitola"
                }
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return resp
    } catch (e) {

        console.error(e);
        console.error(e.response.data);
        console.error(e.response.status);
        console.error(e.response.headers);
    }
}



const number = 5511954406674
//sendMessage(number);

app.get("/", (req, res) => {
    res.status(200).send("hello this is webhook setup");
});


async function sendMessageButton(number) {
    try {
        console.log('entrou')
        let resp = await axios({
            url: `https://graph.facebook.com/v14.0/103734019157955/messages?access_token=${token}`,
            method: 'post',
            data: {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": number,
                "type": "interactive",
                "interactive": {
                    "type": "button",
                    "body": {
                        "text": "Ja devolveu a maquina ?"
                    },
                    "action": {
                        "buttons": [{
                                "type": "reply",
                                "reply": {
                                    "id": "1",
                                    "title": "Sim"
                                }
                            },
                            {
                                "type": "reply",
                                "reply": {
                                    "id": "2",
                                    "title": "Não"
                                }
                            }
                        ],
                    },
                },
            },
        })
    } catch (e) {

        console.error(e.response.data);
        console.error(e.response.status);
        console.error(e.response.headers);
    }
};

//sendMessageButton(number);