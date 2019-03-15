import { Document } from 'mongoose';

export default interface IUser extends Document{
    email: string;
    name: string;
    birthday: Date;
    fbId: string;
    gender: string;
    role: string;
    active: boolean;
}
