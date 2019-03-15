import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import userDb from '../db/services/UserDb';
import IUser from '../models/interfaces/IUser';
import jwtHelper from '../helpers/JwtHelper';
import JwtSignImpl from '../models/implementations/JwtSign';
import FacebookResponse from "../models/implementations/FacebookResponse";

export default class AuthController {

    public static async loginWithFacebook(req: Request, res: Response, next: NextFunction) {
        let {userID, grantedScopes, accessToken} = req.body;
        grantedScopes = grantedScopes + ",name";
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
            return res.status(400).send(error.response)
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
        return res.status(200).send({token, user});
    }

}
