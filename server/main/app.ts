'use strict';

import express from "express";
import {Routes} from "../app/routes";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import io from "socket.io";
import dotenv from "dotenv";

//let http = require("http").Server(app);
//let io = require("socket.io")(http);

/*

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

*/



class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoURL: string = "";

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        dotenv.config();
        this.mongoURL = process.env["MONGO_URL"] as string;
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(cors());
        this.mongoSetup();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoURL, {useNewUrlParser: true});
    }

}

export default new App().app;
