export class MusicService {

    getUserGenre = (genres: String[]): GenreObject[] => {
        let mostCommonWords: Map<String, number> = new Map<String, number>();
        if(genres && genres.length > 0) {
            genres.forEach(genre => {
                let tokenizedStrings: String[] = genre.split(",");
                tokenizedStrings.forEach(word => {
                    mostCommonWords.get(word)
                        // @ts-ignore
                        ? mostCommonWords.set(word, mostCommonWords.get(word) + 1)
                        : mostCommonWords.set(word, 1)
                });
            })
        }
        return this.sortMapByValue(mostCommonWords);
    };



    private sortMapByValue = (map: Map<String, number>): GenreObject[] =>{
        let sortedArray: GenreObject[] = [];
        map.forEach((key, value) => {
            let object: GenreObject = {
                genre: "",
                count: 0
            };
            object.genre = value;
            object.count = key;
            if (object.count > parseInt(process.env.MINIMUM_GENRE_LISTENED_AMOUNT as string)){
                sortedArray.push(object)
            }
        });
        return sortedArray;
    }
}

interface GenreObject {
    genre: String,
    count: number;
}
