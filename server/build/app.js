"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express application instance
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
// Environment Variables
var dotenv = require('dotenv');
dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(function () { return console.log('MongoDB connected.'); })
    .catch(function (err) { return console.log(err); });
io.on('connection', function (socket) {
    socket.on('SEND_MESSAGE', function (data) {
        console.log("ID: " + socket.id + " Name: " + data.user, " Message: " + data.message);
        socket.broadcast.emit('SEND_MESSAGE', (data));
    });
    socket.on('CREATED', function (data) {
        socket.broadcast.emit('CREATED', data);
    });
    socket.on('CHAT_MESSAGE', function (data) {
        socket.broadcast.emit('CHAT_MESSAGE', data);
    });
    socket.on('TYPING', function (data) {
        socket.broadcast.emit('TYPING', data);
    });
    socket.on('TYPING_STOPPED', function (data) {
        socket.broadcast.emit('TYPING_STOPPED', data);
    });
    socket.on('disconnect', function () {
        console.log('disconnected');
    });
});
// Load Routes
var router = require('../app/routes');
router(app);
var port = process.env.PORT || 5000;
http.listen(port, function () {
    console.log("Server started at port " + port);
});
