import {Request, Response, NextFunction} from "express";
import axios from 'axios';

export default class AuthController {

    public static async loginWithFacebook(req: Request, res: Response, next: NextFunction) {

        let {userID, grantedScopes, accessToken} = req.body;
        grantedScopes = grantedScopes + ",name";

        let response = null;
        try {
            response = await axios.get(`https://graph.facebook.com/${userID}?fields=${grantedScopes}&access_token=${accessToken}`);
            console.log(response.data)
            return res.status(200).send(response.data)
        } catch (error) {
            console.log(error.response.data);
            return res.status(400).send(error.response.data)
        }
    }
}

