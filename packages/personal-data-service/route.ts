import {Router} from 'express';

import {Password} from './schema';

export const passwordRoute = Router();

interface QueryParams {
    'service-name': string,
    'user-id': string
};

function validateParams(req, res, next) {
    const {
        'service-name': name,
        'user-id' : userId
    }: QueryParams = req.query;

    const params = [name, userId];

    if (!allExists(params)) {
        throw new Error('Params required');
    }

    if (!allStrings(params)) {
        new Error('Params wrong type');
    }

    next();
}

function allExists(values: Array<String>): Boolean {
    return values.every((value) => Boolean(value));
}

function allStrings(values: Array<String>): Boolean {
    return values.every((value) => {
        return typeof value === 'string';
    });
}

passwordRoute.get('/', validateParams, async (req, res) => {
    try {
        const {
            'service-name': name,
            'user-id' : userId
        } = req.query;

        const findParams = {
            name,
            userId
        };

        const passwords = await Password.find(findParams);

        res.json(passwords);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}, onError);

function onError(error: Error, req, res, next: Function) {
    res
        .status(500)
        .send(error.message);
}

passwordRoute.post('/', async (req, res) => {
    const {
        name,
        hash
    } = req.body;

    const password = new Password({
        name,
        hash
    });

    await password.save();

    res.send('Done');
});
