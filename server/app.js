let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let dotenv = require ('dotenv');
// Environment Variables
dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());


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

app.get('/', function(req, res){
    res.send('Welcome');
});

const port = process.env.PORT || 5000;
http.listen(port, function(){
    console.log(`Server started at port ${port}`)
});

