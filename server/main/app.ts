import express, {Request, Response} from "express";
import {Routes} from "../app/routes";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import {createServer, Server} from 'http';
import socketIo from 'socket.io';


export class ChatServer {
    public static readonly PORT: number = process.env.PORT as unknown as number || 5000;
    private mongoURL: string;
    private app: express.Application;
    private server: Server;
    private io: socketIo.Server;

    constructor() {
        this.createApp();
        this.config();
        this.mongoSetup();
        this.createSocket();
        this.serveSPA();
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
        if(process.env.NODE_ENV !== "production") {
            this.app.use(cors({credentials: true, origin: process.env["CLIENT_ORIGIN"]}));
        }
        this.app.use(logger('tiny')); // Log requests to API using morgan
        Routes.routes(this.app);
    }

    private mongoSetup(): void {
        this.mongoURL = process.env.MONGO_URL as string;
        mongoose.Promise = global.Promise;
        mongoose.set('useCreateIndex', true);
        mongoose.connect(this.mongoURL, {useNewUrlParser: true})
            .then(() => {
                console.log("MongoDB Connected");
            })
            .catch((error) => {
            console.log(error);
        });
    }

    private createSocket(): void {
        this.server.listen(ChatServer.PORT, () => {
            console.log('Running server on port %s', ChatServer.PORT);
        });
        Routes.chat(this.io);
    }

    private serveSPA() {
            // Static folder
            this.app.use(express.static(__dirname + '/public'));
            // Handle SPA
            this.app.get('*', (req: Request, res: Response) => res.sendFile(__dirname + '/public/index.html'));
    }

    public getApp(): express.Application {
        return this.app;
    }
}
