const axios = require('axios')

exports.loginWithFacebook = async function (req, res, next) {
    let {userID, grantedScopes, accessToken} = req.body;
    grantedScopes = grantedScopes + ",name";

    let response = null;
    try {
        response = await axios.get(`https://graph.facebook.com/${userID}?fields=${grantedScopes}&access_token=${accessToken}`)
        return res.status(200).send(response.data)
    } catch (error) {
        return res.status(400).send(error.response.data)
    }
};
