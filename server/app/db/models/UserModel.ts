import mongoose, { Schema } from 'mongoose';
import IUser from "../../models/interfaces/IUser";

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    fbId: {
        type: String,
        required: true
    },
    gender: {
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

