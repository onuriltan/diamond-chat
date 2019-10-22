import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import querystring from 'querystring';
import request from 'request';
import userDb from '../db/services/UserDb';
import ISpotifyLoginRes from "../models/interfaces/login/ISpotifyLoginRes";
import SpotifyLoginRes from "../models/implementations/login/SpotfiyLoginRes";

export class AuthController {

    public loginWithSpotify(req: Request, res: Response, next: NextFunction) {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI
            }))
    }

    public spotifyCallback(req: Request, res: Response, next: NextFunction) {
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
            await this.addUser(access_token);
            let redirectURL = process.env.REDIRECT_URL;
            res.redirect(redirectURL + access_token)
        })
    }

     async getSpotifyUserInfo(req: Request, res: Response, next: NextFunction) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
        let response = await axios.get(process.env.SPOTIFY_USER_URL as string);
        if(response.status === 200) {
            return res.status(200).send(response.data);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    private async addUser(token: String) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        let response = await axios.get(process.env.SPOTIFY_USER_URL as string);
        let spotifyRes: ISpotifyLoginRes = new SpotifyLoginRes(response.data);
        let existingUser = await userDb.getUser(spotifyRes.id);
        let user = null;
        if(!existingUser) {
            user = await userDb.addUser(spotifyRes);
        }
        else {
            user = existingUser;
        }
        return user;
    }

}
