import {Router} from "express";
import {Application} from "express";
import {Server} from 'socket.io';

// Controllers
import {AuthController} from './controllers/AuthController';
import {ChatController} from "./controllers/ChatController";
import { MusicController } from "./controllers/MusicController";

export class Routes {

    public initRoutes(app: Application): void {
        let musicController = new MusicController();
        let authController = new AuthController();
        let apiRoutes = Router();
        let authRoutes = Router();
        let musicRoutes = Router();

        // Base route
        app.use('/api', apiRoutes);

        // Auth Routes
        apiRoutes.use('/auth', authRoutes);
        authRoutes.get('/spotify', authController.loginWithSpotify);
        authRoutes.get('/spotify/callback', authController.spotifyCallback);
        authRoutes.post('/spotify/userInfo', authController.getSpotifyUserInfo);

        // Music Routes
        apiRoutes.use('/music', musicRoutes);
        musicRoutes.post('/top/artists', musicController.getUserTopArtists);
        musicRoutes.post('/top/tracks', musicController.getUserTopTracks);
        musicRoutes.post('/current/playing', musicController.getCurrentPlaying);
        musicRoutes.get('/userGenre', musicController.getUserGenre);

    }

    public chat(io: Server): void {
        let chatController = new ChatController();
        chatController.chat(io);
    }
}
