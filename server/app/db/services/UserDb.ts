import UserModel from '../models/UserModel';
import IFacebookResponse from "../../models/interfaces/IFacebookResponse";

export default class UserDb {

    public static async getUser(email: string) {
        return UserModel.findOne({email})
    }

    public static async addUser(data: IFacebookResponse) {
        const newUser = new UserModel({
            email: data.email,
            name: data.name,
            birthday: data.birthday,
            fbId: data.id,
            gender: data.gender,
            role: 'user',
        });
        return await newUser.save();
    }
}
