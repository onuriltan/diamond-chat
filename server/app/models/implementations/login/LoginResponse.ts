import ILoginResponse from "../../interfaces/login/ILoginResponse";

export default class LoginResponse implements ILoginResponse {
    email: string;
    role: string;
    gender: string;
    age: number;
    firstName: string;
    fullName: string;

    constructor(email: string, role: string, gender: string, age: number, firstName: string, fullName: string) {
        this.email = email;
        this.role = role;
        this.gender = gender;
        this.age = age;
        this.firstName = firstName;
        this.fullName = fullName;
    }

}
