import * as mongoose from "mongoose";
import {UserSchema} from '../models/UserModel';
import {FacebookData} from "../../models/FacebookModel";

const User = mongoose.model('User', UserSchema);

export default class UserDb {

    public static async getUser(email: string) {
        return User.findOne({email})
    }

    public static async addUser(data: FacebookData) {
        const newUser = new User({
            email: data.email,
            name: data.name,
            birthday: data.birthday,
            fbId: data.id,
            gender: data.gender,
            role: 'user',
        });
        await newUser.save();
        return newUser;
    }
}
