import ILoginResponse from "../interfaces/ILoginResponse";

export default class LoginResponse implements ILoginResponse {
    email: string;
    role: string;
    gender: string;
    age: number;
    token: string;

    constructor(email: string, role: string, gender: string, age: number, token: string,) {
        this.email = email;
        this.role = role;
        this.gender = gender;
        this.age = age;
        this.token = token;
    }

}
