import express from "express";
import {Request, Response, Application} from "express";

// Controllers
import authController from './controllers/AuthController';

export class Routes {
    public static routes(app: Application): void {
        let apiRoutes = express.Router();
        let authRoutes = express.Router();

        app.get('/', function(req : Request, res : Response){
            res.send('Hello Guys');
        });

        // Auth Routes
        apiRoutes.use('/auth', authRoutes);
        authRoutes.post('/facebook', authController.loginWithFacebook);

        // Base route
        app.use('/api', apiRoutes);
    }
}
