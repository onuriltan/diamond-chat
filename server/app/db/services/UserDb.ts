import UserModel from '../models/UserModel';
import ISpotifyLoginRes from "../../models/interfaces/spotfiy/ISpotifyLoginRes";

export default class UserDb {

    public static async getUser(spotfiyId: string) {
        return UserModel.findOne({spotfiyId})
    }

    public static async addUser(data: ISpotifyLoginRes) {
        const newUser = new UserModel({
            email: data.email,
            fullName: data.display_name,
            birthdate: data.birthdate,
            spotfiyId: data.id,
            role: 'user',
        });
        return await newUser.save();
    }

    public static async updateUser(data: ISpotifyLoginRes) {
        const user = new UserModel({
            email: data.email,
            fullName: data.display_name,
            birthdate: data.birthdate,
            spotfiyId: data.id,
            role: 'user',
        });
        UserModel.findOneAndUpdate(
            {spotfiyId: data.id}, // find a document with that filter
            user, // document to insert when nothing was found
            {upsert: true, new: true, runValidators: true}, // options
            function (err, doc) { // callback
                if (err) {
                    console.log(err)
                } else {

                }
            }
        );
    }
}
