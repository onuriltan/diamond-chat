import express from "express";
import {Application} from "express";
import {Server} from 'socket.io';

// Controllers
import authController from './controllers/AuthController';
import chatController from "./controllers/ChatController";

export class Routes {

    public static routes(app: Application): void {

        let apiRoutes = express.Router();
        let authRoutes = express.Router();

        // Auth Routes
        apiRoutes.use('/auth', authRoutes);
        //authRoutes.post('/facebook', authController.loginWithFacebook);
        authRoutes.get('/spotify', authController.loginWithSpotify);
        authRoutes.get('/spotify/callback', authController.spotfiyCallback);
        authRoutes.post('/spotify/userInfo', authController.getSpotfiyUserInfo);
        // Base route
        app.use('/api', apiRoutes);
    }

    public static chat(io: Server): void {
        chatController.chat(io);
    }
}
