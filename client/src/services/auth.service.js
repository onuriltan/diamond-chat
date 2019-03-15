import axios from 'axios'

const url = process.env.VUE_APP_AUTH_URL;

class AuthService {
  static loginWithFacebook (params) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.post(`${url}/facebook`, params);
        console.log(res);
        resolve(res)
      } catch (e) {
        resolve(e.response)
      }
    })
  }
}
export default AuthService
