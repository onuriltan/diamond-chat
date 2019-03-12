const passport = require('passport');
const authController = require('./controllers/AuthController');

const express = require('express');

module.exports = function (app) {
    let apiRoutes = express.Router();
    let authRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/facebook', authController.loginWithFacebook);

    // Base route
    app.use('/api', apiRoutes);
};
