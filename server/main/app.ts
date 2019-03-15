import express from "express";
import {Routes} from "../app/routes";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {createServer, Server} from 'http';
import socketIo from 'socket.io';


export class ChatServer {
    public static readonly PORT: number = process.env["PORT"] as unknown as number || 5000;
    private mongoURL: string;
    private app: express.Application;
    private server: Server;
    private io: socketIo.Server;

    constructor() {
        this.createApp();
        this.config();
        this.mongoSetup();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private config(): void {
        dotenv.config();
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(cors());
        Routes.routes(this.app);
    }

    private mongoSetup(): void {
        this.mongoURL = process.env["MONGO_URL"] as string;
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoURL, {useNewUrlParser: true});
    }

    private listen(): void {
        this.server.listen(ChatServer.PORT, () => {
            console.log('Running server on port %s', ChatServer.PORT);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected socket client on port %s.', ChatServer.PORT);

            socket.on('SEND_MESSAGE', function (data: { user: string; message: string; }) {
                console.log("ID: " + socket.id + " Name: " + data.user, " Message: " + data.message);
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
            socket.on('disconnect', () => {
                console.log('disconnected')
            })
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
