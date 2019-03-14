import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import {FacebookData} from "../models/FacebookResponse";
import userDb from '../db/services/UserDb';


export default class AuthController {

    public static async loginWithFacebook(req: Request, res: Response, next: NextFunction) {
        let {userID, grantedScopes, accessToken} = req.body;
        grantedScopes = grantedScopes + ",name";

        let response = null;
        try {
            response = await axios.get<FacebookData>(`https://graph.facebook.com/${userID}?fields=${grantedScopes}&access_token=${accessToken}`);
            let existingUser = userDb.getUser(response.data.email);
            if(existingUser) {
                return res.sendStatus(200);
            }else {
                let user = userDb.addUser(response.data);
                if(user) {
                    return res.sendStatus(200);
                }else {
                    return res.status(400).send({"error": "error occurred"})
                }
            }
        } catch (error) {
            return res.status(400).send(error.response.data)
        }
    }
}
