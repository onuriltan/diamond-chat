import ILoginResponse from "../interfaces/ILoginResponse";

export default class LoginResponse implements ILoginResponse {
    private email: string;
    private role: string;
    private token: string;

    constructor(email: string, role: string, token: string) {
        this.email = email;
        this.role = role;
        this.token = token;
    }

    get userRole(): string {
        return this.role;
    }

    set userRole(value: string) {
        this.role = value;
    }
    get userEmail(): string {
        return this.email;
    }

    set userEmail(value: string) {
        this.email = value;
    }

    get userToken(): string {
        return this.token;
    }

    set usertoken(value: string) {
        this.token = value;
    }
}
