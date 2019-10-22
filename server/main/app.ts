import express, {Request, Response, Application} from "express";
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
    private mongoURL: string = '';
    private app: Application = express();
    private server: Server = createServer(this.app);
    private io: socketIo.Server = socketIo(this.server);
    private routes: Routes;

    constructor() {
        this.routes = new Routes();
        this.io = socketIo(this.server);
        this.server = createServer(this.app);
        this.app = express();
        this.mongoURL = process.env.MONGO_URL as string;
        console.log(this.mongoURL)
        this.config();
        this.mongoSetup();
        this.createSocket();
        this.initRoutes();
        this.serveSPA();
    }

    public getApp(): Application {
        return this.app;
    }

    private config(): void {
        dotenv.config();
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(cors({origin: true}));
        this.app.use(logger('tiny')); // Log requests to API using morgan
    }

    private initRoutes(): void {
        this.routes.initRoutes(this.app)
    }

    private mongoSetup(): void {
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
        // this.routes.chat(this.io);
    }

    private serveSPA() {
        if (process.env.NODE_ENV !== 'development') {
            this.app.use(express.static(__dirname + '/dist'));
            this.app.get('*', (req: Request, res: Response) => res.sendFile(__dirname + '/dist/index.html'));
        }
    }
}
