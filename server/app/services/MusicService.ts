import { IGenre } from "../models/interfaces/music/IGenre";
import { SortService } from "./SortService";

export class MusicService {

    sortService: SortService;

    constructor() {
        this.sortService = new SortService()
    }

    getUserGenre = (genres: String[]): IGenre[] => {
        let genreListenCount: Map<String, number> = new Map<String, number>();
        if(genres && genres.length > 0) {
            genres.forEach(genre => {
                let tokenizedStrings: String[] = genre.split(",");
                tokenizedStrings.forEach(word => {
                    genreListenCount.get(word)
                        // @ts-ignore
                        ? genreListenCount.set(word, genreListenCount.get(word) + 1)
                        : genreListenCount.set(word, 1)
                });
            })
        }
        return this.sortMapByValueToArray(genreListenCount);
    };



    private sortMapByValueToArray = (map: Map<String, number>): IGenre[] =>{
        let sortedArray: IGenre[] = [];
        map.forEach((key, value) => {
            let genre: IGenre = {
                genre: value,
                count: key
            };
            sortedArray.push(genre)
        });
        sortedArray = this.sortService.quickSort(sortedArray);
        sortedArray = sortedArray.slice(0,3);
        return sortedArray;
    }
}
