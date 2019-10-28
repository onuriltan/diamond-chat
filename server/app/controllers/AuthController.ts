import {Request, Response} from "express";
import axios from 'axios';
import querystring from 'querystring';
import request from 'request';
import userDb from '../db/services/UserDb';
import ISpotifyLoginRes from "../models/interfaces/login/ISpotifyLoginRes";
import SpotifyLoginRes from "../models/implementations/login/SpotfiyLoginRes";

export class AuthController {

    loginWithSpotify = (req: Request, res: Response) => {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI
            }))
    };

    spotifyCallback = (req: Request, res: Response) => {
        let code = req.query.code || null;
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(
                    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
                ).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, async (error, response, body) => {
            let access_token = body.access_token;
            await this.addUser(access_token, res);
            let redirectURL = process.env.REDIRECT_URL;
            res.redirect(redirectURL + access_token)
        })
    };

    getSpotifyUserInfo = async (req: Request, res: Response) => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
        let response = null;
        try {
            response = await axios.get(process.env.SPOTIFY_USER_URL as string);
        }catch (e) {
            return res.status(e.response.data.error.status).send(e.response.data.error)
        }
        return res.status(200).send(response.data);
    };

    private addUser = async (token: String, res:Response) => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        let response = null;
        try {
            response = await axios.get(process.env.SPOTIFY_USER_URL as string);
        }catch (e) {
            return res.status(e.response.data.error.status).send(e.response.data.error)
        }
        let spotifyRes: ISpotifyLoginRes = new SpotifyLoginRes(response.data);
        let existingUser = await userDb.getUser(spotifyRes.id);
        let user = null;
        if (!existingUser) {
            user = await userDb.addUser(spotifyRes);
        } else {
            user = existingUser;
        }
        return user;
    }

}
