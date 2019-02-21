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
    console.log("Socket Id "+ socket.id);
    socket.on('SEND_MESSAGE', function(data) {
        console.log("Message "+ data.message);
        io.emit('MESSAGE', data)
    });
});

app.get('/', function(req, res){
    res.send('Welcome');
});

const port = process.env.PORT || 5000;
http.listen(port, function(){
    console.log(`Server started at port ${port}`)
});

