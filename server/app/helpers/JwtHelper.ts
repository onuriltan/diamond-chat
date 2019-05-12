import {Request} from "express";
import * as jwt from 'jsonwebtoken'
import IJwtSign from "../models/interfaces/login/IJwtSign";

export default class JwtHelper {

    public static verifyToken(req: Request): any {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(' ');
            return bearer[1];
        } else {
            return null;
        }
    }

    public static decodeToken(req: Request): any {
        const bearerToken = this.verifyToken(req);
        if (bearerToken !== null) {
            let userData = null;
            try {
                userData = jwt.verify(bearerToken, process.env.JWT_SECRET as string);
            } catch (err) {
                console.log("Error verifying token");
                return null;
            }
            return userData
        } else {
            return null;
        }
    }

    public static generateToken(jwtSignModel: IJwtSign) {
        return jwt.sign({jwtSignModel}, process.env.JWT_SECRET as string, {
                expiresIn: process.env.TOKEN_EXPIRY
        });
    }
}
