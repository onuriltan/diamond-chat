import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import querystring from 'querystring';
import request from 'request';
import userDb from '../db/services/UserDb';
import IUser from '../models/interfaces/IUser';
import jwtHelper from '../helpers/JwtHelper';
import helper from '../helpers/GeneralHelper';
import JwtSignImpl from '../models/implementations/JwtSign';
import FacebookResponse from "../models/implementations/FacebookResponse";
import LoginResponse from "../models/implementations/LoginResponse";

export default class AuthController {

    public static async loginWithFacebook(req: Request, res: Response, next: NextFunction) {
        let {userID, grantedScopes, accessToken} = req.body;
        grantedScopes = grantedScopes + ",name,first_name";
        let response = null;
        try {
            response = await axios.get(`https://graph.facebook.com/${userID}?fields=${grantedScopes}&access_token=${accessToken}`);
            let fbRes: FacebookResponse = new FacebookResponse(response.data);
            let existingUser = await userDb.getUser(fbRes.email);
            if (existingUser) {
                AuthController.sendToken(existingUser, res);
            } else {
                await AuthController.addUser(fbRes, res);
            }
        } catch (error) {
            return res.status(400).send(error.response.data)
        }
    }


    public static loginWithSpotify(req: Request, res: Response, next: NextFunction) {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: 'user-read-private user-read-email',
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
        request.post(authOptions, (error, response, body) => {
            let access_token = body.access_token;
            let uri = process.env.FRONTEND_URI || 'http://localhost:8080';
            res.redirect(uri + '/?access_token=' + access_token)
        })
    }

    static async getSpotfiyUserInfo(req: Request, res: Response, next: NextFunction) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
        let response;
        try {
            response = await axios.get("https://api.spotify.com/v1/me");
        } catch (error) {
            return res.status(400).send({"error": "invalid token"})
        }
        if(response.status === 200) {
            return res.status(200).send(response.data);
        }
    }

    private static async addUser(fbRes: FacebookResponse, res: Response) {
        let user: IUser = await userDb.addUser(fbRes);
        if (user) {
            AuthController.sendToken(user, res);
        } else {
            return res.status(400).send({"error": "error occurred"})
        }

    }

    private static sendToken(user: IUser, res: Response) {
        let jwtSign: JwtSignImpl = new JwtSignImpl(user.email, user.role);
        let token = jwtHelper.generateToken(jwtSign);
        // @ts-ignore
        let secure: boolean = helper.convertToBoolean(process.env['COOKIE_SECURE']);
        // @ts-ignore
        let maxAge: number = helper.convertToNumber(process.env['TOKEN_EXPIRY']);
        const cookieOptions: object = {
            httpOnly: false,
            secure,
            maxAge
        };
        let age = helper.calculateAge(user.birthday);
        let loginResponse: LoginResponse = new LoginResponse(user.email, user.role, user.gender, age, user.firstName, user.fullName);
        res.cookie(process.env["JWT_NAME"] as string , token, cookieOptions);
        return res.send(loginResponse);
    }

}
