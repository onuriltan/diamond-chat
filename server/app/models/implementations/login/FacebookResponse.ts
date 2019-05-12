import IFacebookResponse from "../../interfaces/login/IFacebookResponse";

export default class FacebookResponse implements IFacebookResponse {

    private _age_range: object;
    private _birthday: string;
    private _email: string;
    private _gender: string;
    private _id: string;
    private _first_name: string;
    private _name: string;

    constructor(data: any) {
        this._age_range = data.age_range;
        this._birthday = data.birthday;
        this._email = data.email;
        this._gender = data.gender;
        this._id = data.id;
        this._first_name = data.first_name;
        this._name = data.name;

    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get first_name(): string {
        return this._first_name;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get gender(): string {
        return this._gender;
    }

    set gender(value: string) {
        this._gender = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get birthday(): string {
        return this._birthday;
    }

    set birthday(value: string) {
        this._birthday = value;
    }

    get age_range(): object {
        return this._age_range;
    }

    set age_range(value: object) {
        this._age_range = value;
    }


}
