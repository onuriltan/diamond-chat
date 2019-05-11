import mongoose, { Schema } from 'mongoose';
import IUser from "../../models/interfaces/IUser";

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    spotfiyId: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>("User", UserSchema);

