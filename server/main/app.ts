import express, {Request, Response} from "express";
import {Routes} from "../app/routes";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import http from 'http';
import socketIo from 'socket.io';

export class App {
    public port: number;
    private mongoURL: string;
    private app: express.Application;
    private server: http.Server;
    private io: socketIo.Server;
    private routes: Routes;

    constructor() {
        dotenv.config();
        this.mongoURL = process.env.MONGO_URL as string;
        this.port = parseInt(process.env.PORT || '5000');
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
        this.routes = new Routes();
        this.middlewares();
        this.mongoSetup();
        this.initRoutes();
        this.serveSPA();
    }

    private middlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(cors({origin: true}));
        this.app.use(logger('tiny')); // Log requests to API using morgan
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


    private serveSPA() {
        if (process.env.NODE_ENV !== 'development') {
            this.app.use(express.static(__dirname + '/dist'));
            this.app.get('*', (req: Request, res: Response) => res.sendFile(__dirname + '/dist/index.html'));
        }
    }

    private initRoutes = () => {
        this.routes.initRoutes(this.app);
        this.routes.chat(this.io);
    };

    public listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }
}
