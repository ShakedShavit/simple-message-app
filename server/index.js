const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const Message = require('./models/message');

const port = process.env.PORT;

const app = express(); //creates express object

const bodyParser = require('body-parser');
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.get('/', (req, res) => {
//     console.log('api working. ', 'url: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
// });

app.get('/message/get-all', async (req, res) => {
    console.log('inside get all messages route');
    try {
        const messages = await Message.find();

        if (messages.length === 0) {
            return (
                res.status(404).send({
                status: 404,
                message: 'No messages found'
            }));
        }
        
        res.status(200).send(messages);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/message/post', async (req, res) => {
    try {
        const message = await new Message({ ...req.body });

        if (!message) {
            return (
                res.status(400).send({
                    status: 400,
                    message: 'Creating new message action failed'
            }));
        }
    
        message.save();
        res.status(201).send(message);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/', (req, res) => {
    res.send('ok');
})

app.listen(port, () => { //starting the server with the port. i think it means listenning to requests to the server
   console.log('server connected, port:', port);
});