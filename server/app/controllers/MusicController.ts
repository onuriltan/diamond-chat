import {Request, Response, NextFunction} from "express";
import axios, {AxiosRequestConfig} from 'axios';
import Track from '../models/implementations/music/Track'
import TopArtistsResponse from "../models/response/TopArtistsResponse";
import ITrack from "../models/interfaces/music/ITrack";

export class MusicController {
    constructor(public data: number[]) {}

    getAxiosReqConfig (token: String): AxiosRequestConfig {
        let config = { } as AxiosRequestConfig;
        config.headers =  {'Authorization': `Bearer ${token}`};
        return config
    }

    async getUserTopTracks(req: Request, res: Response, next: NextFunction) {
        let response = await this.getRequest(process.env.SPOTIFY_TOP_TRACKS_URL as string, req.body.token);
        if(response.status === 401){
            return res.status(401).send({"error": "access token expired"})
        }
        let convertedRes = this.convertTracks(response.data.items);
        if(response.status === 200) {
            return res.status(200).send(convertedRes);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

     async getUserTopArtists(req: Request, res: Response, next: NextFunction) {
        let response = await this.getRequest(process.env.SPOTIFY_TOP_ARTISTS_URL as string, req.body.token);
        if(response.status === 401){
            return res.status(401).send({"error": "access token expired"})
        }
        if(response.status === 200) {
            return res.status(200).send(response.data);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    async getUserGenre(req: Request, res: Response, next: NextFunction) {
        let url: string = process.env.SPOTIFY_TOP_ARTISTS_URL as string;
        console.log(this.data);
        console.log(this.getAxiosReqConfig(req.headers.authorization as string));
        let response = await axios.get(url, this.getAxiosReqConfig(req.headers.authorization as string));
        if(response.status === 401){
            return res.status(401).send({"error": "access token expired"})
        }
        if(response.status === 200) {
            let theResponse: TopArtistsResponse = response.data;
            let genres: string[] = [];
            theResponse.items.forEach(item => {
                genres.push(item.genres.toString())
            });
            return res.status(200).send(genres)
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    async asd(req: Request, res: Response, next: NextFunction) {
        console.log(this)
        return res.status(200).send({ "fuckyea": 'yea'})
    }


    async getCurrentPlaying(req: Request, res: Response, next: NextFunction) {
        let response = await this.getRequest(process.env.SPOTIFY_CURRENT_PALYING_URL as string, req.body.token);
        if(response.status === 401){
            return res.status(401).send({"error": "access token expired"})
        }
        if(response.status === 200) {
            return res.status(200).send(response.data);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

     convertTracks(topTracks: Array<any>) {
        let tracks = new Array<ITrack>();
        for(let track of topTracks) {
            let t = new Track();
            t.id = track.id;
            t.artistName = track.artists[0].name;
            t.imageUrl = track.album.images[0].url;
            t.trackName = track.name;
            t.trackUrl = track.preview_url;
            tracks.push(t);
        }
        return tracks;
    }

    async getRequest (url: string, token: string) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        try {
            return await axios.get(url)
        } catch (error) {
            return error.response
        }
    }

}
