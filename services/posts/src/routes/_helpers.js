const request = require('request-promise');
const fs = require('fs');

function ensureAuthenticated(req, res, next) {
    /* eslint-disable */
    if (process.env.NODE_ENV === 'test') {
        ensureAuthenticated = (req, res, next) => {
            req.user = 1;
            return next();
        };
    }
    /* eslint-enable */
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).json({ status: 'Please log in' });
    }
    const options = {
        method: 'GET',
        uri: 'http://users-service:3001/api/v1/users/check',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
        },
    };
    return request(options)
        .then((response) => {
            req.user = response.id;
            return next();
        })
        .catch((err) => {
            return next(err);
        });
}

function getSubscriptions(req, next) {
    const options = {
        method: 'GET',
        uri: `http://users-service:3001/api/v1/users/followin/${req.user}`,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
        }
    };
    return request(options)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return next(err);
        });
}

function getUserId(req, next) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (req.headers && req.headers.authorization) {
        headers.Authorization = `Bearer ${req.headers.authorization.split(' ')[1]}`;
    }
    const options = {
        method: 'GET',
        uri: `http://users-service:3001/api/v1/users/user/${req.params.username}`,
        json: true,
        headers
    };
    return request(options)
        .then((response) => {
            return response.user.id;
        })
        .catch((err) => {
            return next(err);
        });
}

function getUsersConciseData(usersIdsArr, req, next) {
    const options = {
        method: 'GET',
        uri: `http://users-service:3001/api/v1/users/concise?ids=${usersIdsArr}`,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
        }
    };
    return request(options)
        .then((response) => {
            return response.users;
        })
        .catch((err) => {
            return next(err);
        });
}

function removePostFiles(paths) {
    const [filePath, thumbPath] = paths;
    return fs.unlinkSync(filePath)
        .then(() => {
            if (thumbPath) fs.unlinkSync(thumbPath);
        })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
}

module.exports = {
    ensureAuthenticated,
    getUserId,
    getSubscriptions,
    getUsersConciseData,
    removePostFiles
};