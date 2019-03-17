import express from "express";
import {Request, Response, Application} from "express";

// Controllers
import authController from './controllers/AuthController';

export class Routes {

    public static routes(app: Application): void {
        let apiRoutes = express.Router();
        let authRoutes = express.Router();
        // Static folder
        app.use(express.static(__dirname + '/public'));
        // Handle SPA
        app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));
        app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

        // Auth Routes
        apiRoutes.use('/auth', authRoutes);
        authRoutes.post('/facebook', authController.loginWithFacebook);

        // Base route
        app.use('/api', apiRoutes);
    }
}
