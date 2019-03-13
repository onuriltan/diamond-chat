const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const router = require('./app/routes');

// Environment Variables
const dotenv = require ('dotenv');
dotenv.config();

// Auth Config
require('./app/config/PassportConfig');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));


io.on('connection', function(socket) {
    socket.on('SEND_MESSAGE', function(data) {
        console.log("ID: "+socket.id+" Name: "+ data.user, " Message: "+ data.message);
        socket.broadcast.emit('SEND_MESSAGE', (data))
    });
    socket.on('CREATED', data => {
        socket.broadcast.emit('CREATED', data)
    });
    socket.on('CHAT_MESSAGE', data => {
        socket.broadcast.emit('CHAT_MESSAGE', data)
    });
    socket.on('TYPING', data => {
        socket.broadcast.emit('TYPING', data)
    });
    socket.on('TYPING_STOPPED', data => {
        socket.broadcast.emit('TYPING_STOPPED', data)
    });
    socket.on('disconnect', ()=> {
        console.log('disconnected')
    })
});


// Load Routes
router(app);

const port = process.env.PORT || 5000;
http.listen(port, function(){
    console.log(`Server started at port ${port}`)
});

