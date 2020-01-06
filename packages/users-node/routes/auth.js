import express from 'express';
import md5 from 'md5';

import {User} from '../schema/user.js';
import {Auth} from '../schema/auth.js';

export const authRouter = express.Router();

const period = 1000 * 60 * 10;

/*
    @TODO
    proceed existed session by userId
*/
authRouter.post('/auth',
    validateParams,
    restoreUser,
    generateAuth
);

/*
    
    @TODO
    redesign
    maybe make auth check without retrieving user
*/
/*
    @TODO
    redesign error handling
*/
authRouter.get('/auth/:token',
    restoreAuth,
    checkExpire,
    prolongAuth,
    getAuthUser
);

async function restoreAuth(req, res, next) {
    const {token} = req.params;

    try {
        const auth = await Auth
            .findOne({token}).exec();

        if (!auth) {
            return res
                .status(401)
                .send('Not authorized');
        }

        req.auth = auth;
        next();
    } catch (error) {
        return res
            .status(400)
            .send(error);
    }
}

async function checkExpire(req, res, next) {
    const {auth} = req;
    const accessPoint = new Date(auth.lastAccess).valueOf();
    const currentPoint = new Date().valueOf();

    const expired = accessPoint + period < currentPoint;

    if (expired) {
        try {
            await Auth
                .findByIdAndDelete(auth._id)
                .exec();

            return res.status(401)
                .send('Auth expired');
        } catch (error) {
            return res
                .status(400)
                .send(error);
        }
    }

    next();
}

async function prolongAuth(req, res, next) {
    const {auth} = req;

    try {
        await Auth
            .findByIdAndUpdate(auth._id, {lastAccess: new Date()})
            .exec();

        next();
    } catch (error) {
        return res
            .status(400)
            .send(error);
    }
}

async function getAuthUser(req, res) {
    const {auth} = req;

    try {
        const user = await User.findById(auth.userId)
            .exec();

        res.json(user);
    } catch (error) {
        return res
            .status(400)
            .send(error);
    }
}

function validateParams(req, res, next) {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400)
            .send('Bad params');
    }

    next();
}

async function restoreUser(req, res, next) {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({
            username,
            password: md5(password)
        }).exec();

        if (!user) {
            return res
                .status(404)
                .send('Credentials are wrong.');
        }

        req.user = user;
        next();
    } catch (error) {
        return res
            .status(400)
            .send(error);
    }
}

async function generateAuth(req, res) {
    const {_id: userId} = req.user;
    const token = md5(Math.random());

    try {
        const auth = new Auth({userId, token});

        await auth.save();

        res.json({token: auth.token});
    } catch (error) {
        
        res.status(400)
            .send(error);
    }
}
