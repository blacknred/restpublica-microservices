/* eslint-disable */
const auth = require('./local');

function ensureAuthenticated (req, res, next) {
    console.log('ff');
    if (process.env.NODE_ENV === 'test') {
        ensureAuthenticated = (req, res, next) => {
            req.user = 1;
            return next();
        };
    }
    if (!(req.headers && req.headers.authorization)) {
        return res.status(401)
            .json({
                status: 'error',
                message: 'No access token.'
            });
    }
    // decode the token
    const header = req.headers.authorization.split(' ');
    const token = header[1];
    auth.decodeToken(token, (err, payload) => {
        if (err) {
            return res.status(401).json({
                status: 'error',
                message: payload
            });
        }
        req.user = parseInt(payload.sub, 10);
        return next();
    });
}

module.exports.ensureAuthenticated = ensureAuthenticated;
