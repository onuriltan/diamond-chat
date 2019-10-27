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

export class App {
    public readonly PORT: number = process.env.PORT as unknown as number || 5000;
    private readonly mongoURL: string = '';
    private readonly app: Application = express();
    private readonly server: Server = createServer(this.app);
    private io: socketIo.Server = socketIo(this.server);
    private routes: Routes = new Routes();

    constructor() {
        this.io = socketIo(this.server);
        this.app = express();
        this.server = createServer(this.app);
        this.mongoURL = process.env.MONGO_URL as string;
        this.config();
        this.mongoSetup();
        this.initRoutes();
        this.serveSPA();
    }

    private config(): void {
        dotenv.config();
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
        this.routes.initRoutes(this.app)
    };

    public listen(): void {
        this.server.listen(this.PORT, () => {
            console.log('Running server on port %s', this.PORT);
        });
        this.routes.chat(this.io);
    }
}
