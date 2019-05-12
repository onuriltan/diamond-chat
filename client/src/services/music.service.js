import axios from 'axios'

const topTracksUrl = process.env.VUE_APP_TOP_TRACKS_URL;

class MusicService {

  static async getTopTracks(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(topTracksUrl, {token});
        resolve(res)
      } catch (e) {
        reject(e)
      }
    })
  }

}

export default MusicService
