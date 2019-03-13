const express = require('express');

// Controllers
const authController = require('./controllers/AuthController');

module.exports = function (app) {
    let apiRoutes = express.Router();
    let authRoutes = express.Router();

    app.get('/', function(req, res){
        res.send('Hello Guys');
    });

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/facebook', authController.loginWithFacebook);

    // Base route
    app.use('/api', apiRoutes);
};
