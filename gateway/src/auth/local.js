const moment = require('moment');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

function genToken(userId = 0) {
    const playload = {
        exp: moment().add(5, 'seconds').unix(),
        iat: moment().unix(),
        sub: userId,
    };
    return jwt.encode(playload, process.env.TOKEN_SECRET);
}

function genApiSecret(apiKey) {
    // return hash based on apiKey and TOKEN_SECRET
    return bcrypt.hashSync(apiKey, process.env.TOKEN_SECRET);
}

module.exports = {
    genToken,
    genApiSecret
};
