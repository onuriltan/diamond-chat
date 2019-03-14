import express from "express";
import {Request, Response} from "express";

// Controllers
const authController = require('./controllers/AuthController');

export class Routes {
    public routes(app: express.Application): void {
        let apiRoutes = express.Router();
        let authRoutes = express.Router();

        app.get('/', function(req : express.Request, res : express.Response){
            res.send('Hello Guys');
        });

        // Auth Routes
        apiRoutes.use('/auth', authRoutes);
        authRoutes.post('/facebook', authController.loginWithFacebook);

        // Base route
        app.use('/api', apiRoutes);
    }
}

/*module.exports = function (app : express.Application) {
    let apiRoutes = express.Router();
    let authRoutes = express.Router();

    app.get('/', function(req : express.Request, res : express.Response){
        res.send('Hello Guys');
    });

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/facebook', authController.loginWithFacebook);

    // Base route
    app.use('/api', apiRoutes);
};*/
