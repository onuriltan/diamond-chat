import express = require('express');

// Create a new express application instance
const app: express.Application = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


// Environment Variables
const dotenv = require ('dotenv');
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch((err: any) => console.log(err));


io.on('connection', function(socket: any) {
    socket.on('SEND_MESSAGE', function(data: { user: string; message: string; }) {
        console.log("ID: "+socket.id+" Name: "+ data.user, " Message: "+ data.message);
        socket.broadcast.emit('SEND_MESSAGE', (data))
    });
    socket.on('CREATED', (data: any) => {
        socket.broadcast.emit('CREATED', data)
    });
    socket.on('CHAT_MESSAGE', (data: any) => {
        socket.broadcast.emit('CHAT_MESSAGE', data)
    });
    socket.on('TYPING', (data: any) => {
        socket.broadcast.emit('TYPING', data)
    });
    socket.on('TYPING_STOPPED', (data: any) => {
        socket.broadcast.emit('TYPING_STOPPED', data)
    });
    socket.on('disconnect', ()=> {
        console.log('disconnected')
    })
});


// Load Routes
const router = require('../app/routes');
router(app);

const port = process.env.PORT || 5000;
http.listen(port, function(){
    console.log(`Server started at port ${port}`)
});

