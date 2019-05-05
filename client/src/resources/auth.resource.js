import axios from 'axios'
import querystring from "querystring";

const url = process.env.VUE_APP_AUTH_URL;

class AuthResource {
    static loginWithFacebook(params) {
        return new Promise(async (resolve) => {
            try {
                const res = await axios.post(`${url}/facebook`, params, {withCredentials: true});
                resolve(res)
            } catch (e) {
                resolve(e.response)
            }
        })
    }

    static loginWithSpotify() {
        window.location.href = "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
                scope: 'user-read-private user-read-email, user-top-read, ' +
                    'playlist-read-private, ' +
                    'user-read-recently-played, ' +
                    'user-read-email, ' +
                    'user-read-birthdate',
                redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URI
            });
    }

    static async getUserInfo(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}/spotify/userInfo`, { token });
                resolve(res)
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default AuthResource
