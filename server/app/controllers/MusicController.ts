import {Request, Response} from "express";
import axios, {AxiosRequestConfig} from 'axios';
import Track from '../models/implementations/music/Track'
import TopArtistsResponse from "../models/response/TopArtistsResponse";
import ITrack from "../models/interfaces/music/ITrack";

export class MusicController {
    getAxiosReqConfig = (token: String): AxiosRequestConfig => {
        let config = {} as AxiosRequestConfig;
        config.headers = {'Authorization': `Bearer ${token}`};
        return config
    };

    getUserTopTracks = async (req: Request, res: Response) => {
        let response = null;
        try {
            response = await this.getRequest(process.env.SPOTIFY_TOP_TRACKS_URL as string, req.body.token);
        } catch (e) {
            return res.status(e.response.data.error.status).send(e.response.data.error)
        }
        let convertedRes = this.convertTracks(response.data.items);
        return res.status(200).send(convertedRes);
    };

    getUserTopArtists = async (req: Request, res: Response) => {
        let response = null;
        try {
            response = await await this.getRequest(process.env.SPOTIFY_TOP_ARTISTS_URL as string, req.body.token);
        } catch (e) {
            return res.status(e.response.data.error.status).send(e.response.data.error)
        }
        return res.status(200).send(response.data);
    };

    getUserGenre = async (req: Request, res: Response) => {
        let url: string = process.env.SPOTIFY_TOP_ARTISTS_URL as string;
        let response = null;
        try {
            response = await axios.get(url, this.getAxiosReqConfig(req.headers.authorization as string));
        } catch (e) {
            return res.status(e.response.data.error.status).send(e.response.data.error)
        }
        if (response) {
            let theResponse: TopArtistsResponse = response.data;
            let genres: string[] = [];
            theResponse.items.forEach(item => {
                genres.push(item.genres.toString())
            });
            return res.status(200).send(genres)
        }
    };

    getCurrentPlaying = async (req: Request, res: Response) => {
        let response = null;
        try {
            response = await this.getRequest(process.env.SPOTIFY_CURRENT_PALYING_URL as string, req.body.token);
        } catch (e) {
            return res.status(e.response.data.error.status).send(e.response.data.error)
        }
        return res.status(200).send(response.data);
    };

    convertTracks = (topTracks: Array<any>) => {
        let tracks = new Array<ITrack>();
        for (let track of topTracks) {
            let t = new Track();
            t.id = track.id;
            t.artistName = track.artists[0].name;
            t.imageUrl = track.album.images[0].url;
            t.trackName = track.name;
            t.trackUrl = track.preview_url;
            tracks.push(t);
        }
        return tracks;
    };

    getRequest = async (url: string, token: string) => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        try {
            return await axios.get(url)
        } catch (error) {
            return error.response
        }
    };

}
