import { Document } from 'mongoose';

export default interface IUser extends Document{
    email: string;
    spotfiyId: string;
    fullName: string;
    birthdate: string;
    role: string;
    active: boolean;
}
