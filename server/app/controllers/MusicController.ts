import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import Track from '../models/implementations/music/Track'

export default class MusicController {

    static async getUserTopTracks(req: Request, res: Response, next: NextFunction) {
        let response = await MusicController.getRequest(process.env.SPOTIFY_TOP_TRACKS_URL as string, req.body.token);
        if(response.status === 401){
            return res.status(401).send({"error": "access token expired"})
        }
        let convertedRes = MusicController.convertTracks(response.data.items);
        if(response.status === 200) {
            return res.status(200).send(convertedRes);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    static async getUserTopArtists(req: Request, res: Response, next: NextFunction) {
        let response = await MusicController.getRequest(process.env.SPOTIFY_TOP_ARTISTS_URL as string, req.body.token);
        if(response.status === 401){
            return res.status(401).send({"error": "access token expired"})
        }
        if(response.status === 200) {
            return res.status(200).send(response.data);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    static async getCurrentPlaying(req: Request, res: Response, next: NextFunction) {
        let response = await MusicController.getRequest(process.env.SPOTIFY_CURRENT_PALYING_URL as string, req.body.token);
        if(response.status === 401){
            return res.status(401).send({"error": "access token expired"})
        }
        if(response.status === 200) {
            return res.status(200).send(response.data);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    private static convertTracks(topTracks: Array<any>) {
        let tracks = new Array<Track>();
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

    static async getRequest (url: string, token: string) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        try {
            return await axios.get(url)
        } catch (error) {
            return error.response
        }
    }

}
