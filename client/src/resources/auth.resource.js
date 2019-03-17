import axios from 'axios'

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
}

export default AuthResource
