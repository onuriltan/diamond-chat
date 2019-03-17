import cookie from "js-cookie";

class CookieResource {
  static setCookie = (key, value) => {
    cookie.set(key, value);
  };

  static removeCookie = key => {
    cookie.remove(key);
  };

  static getCookie = (key) => {
    return cookie.get(key);
  };
}
export default CookieResource


