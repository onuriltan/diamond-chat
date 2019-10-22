import ITrack from "../../interfaces/music/ITrack";

export default class Track implements ITrack {
    private _artistName: string;
    private _id: string;
    private _imageUrl: string;
    private _trackName: string;
    private _trackUrl: string;

    constructor() {
        this._artistName = '';
        this._id = '';
        this._imageUrl = '';
        this._trackName = '';
        this._trackUrl = '';
    }

    get trackUrl(): string {
        return this._trackUrl;
    }

    set trackUrl(value: string) {
        this._trackUrl = value;
    }
    get trackName(): string {
        return this._trackName;
    }

    set trackName(value: string) {
        this._trackName = value;
    }
    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get artistName(): string {
        return this._artistName;
    }

    set artistName(value: string) {
        this._artistName = value;
    }


}
