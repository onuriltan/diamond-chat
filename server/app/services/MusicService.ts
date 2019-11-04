export class MusicService {

    getUserGenre(genres: String[]) {
        let mostCommonWords: Map<String, number> = new Map<String, number>();
        if(genres && genres.length > 0) {
            genres.forEach(genre => {
                let tokenizedStrings: String[] = genre.split("");
                tokenizedStrings.forEach(word => {
                    mostCommonWords.get(word)
                        ? mostCommonWords.set(word, mostCommonWords.get(word) + 1)
                        : mostCommonWords.set(word, 1)
                })

            })
        }
    }




}
