import express from "express";
import {Application} from "express";
import {Server} from 'socket.io';

// Controllers
import authController from './controllers/AuthController';
import chatController from "./controllers/ChatController";
import musicController from './controllers/MusicController';

export class Routes {

    public static routes(app: Application): void {

        let apiRoutes = express.Router();
        let authRoutes = express.Router();
        let musicRoutes = express.Router();

        // Base route
        app.use('/api', apiRoutes);

        // Auth Routes
        apiRoutes.use('/auth', authRoutes);
        authRoutes.get('/spotify', authController.loginWithSpotify);
        authRoutes.get('/spotify/callback', authController.spotfiyCallback);
        authRoutes.post('/spotify/userInfo', authController.getSpotfiyUserInfo);

        // Music Routes
        apiRoutes.use('/music', musicRoutes);
        musicRoutes.post('/top/artists', musicController.getUserTopArtists);
        musicRoutes.post('/top/tracks', musicController.getUserTopTracks);
        musicRoutes.post('/current/playing', musicController.getCurrentPlaying);

    }

    public static chat(io: Server): void {
        chatController.chat(io);
    }
}
