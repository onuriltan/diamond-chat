import { Document } from 'mongoose';

export default interface IUser extends Document{
    email: string;
    fullName: string;
    firstName: string;
    birthday: Date;
    fbId: string;
    gender: string;
    role: string;
    active: boolean;
}
