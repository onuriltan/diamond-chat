const axios = require('axios')

exports.loginWithFacebook = async function (req, res, next) {

    let {userID, grantedScopes, accessToken } = req.body;
    grantedScopes = grantedScopes + ",name";
    console.log(grantedScopes);

    axios.get(`https://graph.facebook.com/${userID}?fields=${grantedScopes}&access_token=${accessToken}`)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
};
