export default interface TopArtistsResponse {
    items: TopArtist[];
}


interface TopArtist {
    external_urls: ExternalUrls
    followers: Followers,
    genres: String[],
    href: String,
    id: String,
    images: Object[],
    name: String,
    popularity: Number,
    type: String,
    uri: String

}

interface ExternalUrls {
    spotify: String
}

interface Followers {
    href: String,
    total: Number
}

interface Images {
    height: Number,
    width: Number,
    url: String
}

