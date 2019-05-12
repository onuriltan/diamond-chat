import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import Track from '../models/implementations/music/Track'

export default class MusicController {

    static async getUserTopTracks(req: Request, res: Response, next: NextFunction) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
        let response = await axios.get(process.env.SPOTIFY_TOP_TRACKS_URL as string);
        let convertedRes = MusicController.convertTracks(response.data.items);
        if(response.status === 200) {
            return res.status(200).send(convertedRes);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    static async getUserTopArtists(req: Request, res: Response, next: NextFunction) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
        let response = await axios.get(process.env.SPOTIFY_TOP_ARTISTS_URL as string);

        if(response.status === 200) {
            return res.status(200).send(response.data);
        }else {
            return res.status(400).send({"error": "invalid token"})
        }
    }

    static async getCurrentPlaying(req: Request, res: Response, next: NextFunction) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
        let response = await axios.get(process.env.SPOTIFY_CURRENT_PLAYING_URL as string);
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

}
