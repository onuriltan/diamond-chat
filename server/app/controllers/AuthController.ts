import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import querystring from 'querystring';
import request from 'request';
import userDb from '../db/services/UserDb';
import ISpotifyLoginRes from "../models/interfaces/spotfiy/ISpotifyLoginRes";
import SpotfiyLoginRes from "../models/implementations/spotify/SpotfiyLoginRes";

export default class AuthController {

    /*public static async loginWithFacebook(req: Request, res: Response, next: NextFunction) {
        let {userID, grantedScopes, accessToken} = req.body;
        grantedScopes = grantedScopes + ",name,first_name";
        let response = null;
        try {
            response = await axios.get(`https://graph.facebook.com/${userID}?fields=${grantedScopes}&access_token=${accessToken}`);
            let fbRes: FacebookResponse = new FacebookResponse(response.data);
            let existingUser = await userDb.getUser(fbRes.email);
            if (existingUser) {
                //AuthController.sendToken(existingUser, res);
            } else {
                await AuthController.addUser(fbRes, res);
            }
        } catch (error) {
            return res.status(400).send(error.response.data)
        }
    }*/


    public static loginWithSpotify(req: Request, res: Response, next: NextFunction) {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI
            }))
    }

    public static spotfiyCallback(req: Request, res: Response, next: NextFunction) {
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
            await AuthController.addOrUpdateUser(access_token);
            let redirectURL = process.env.REDIRECT_URL;
            res.redirect(redirectURL + access_token)
        })
    }

    static async getSpotfiyUserInfo(req: Request, res: Response, next: NextFunction) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
        let response = await axios.get(process.env.SPOTIFY_USER_URL as string);
        if(response.status === 200) {
            return res.status(200).send(response.data);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }


    private static async addOrUpdateUser(token: String) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        let response = await axios.get(process.env.SPOTIFY_USER_URL as string);
        let spotifyRes: ISpotifyLoginRes = new SpotfiyLoginRes(response.data);
        let existingUser = await userDb.getUser(spotifyRes.id);
        if(existingUser) {
            await userDb.updateUser(spotifyRes);
        }else {
            await userDb.addUser(spotifyRes);
        }
    }




}
