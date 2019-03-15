import IJwtSign from "../interfaces/IJwtSign";

export default class JwtSign implements IJwtSign {
    private _email: string;
    private _role: string;

    constructor (email: string, role: string) {
        this._email = email;
        this._role = role;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }

}
