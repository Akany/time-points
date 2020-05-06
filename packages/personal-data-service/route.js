import express from 'express';

import {Password} from './schema.js';

export const passwordRoute = express.Router();

passwordRoute.get('/', async (req, res) => {
    try {
        const {name} = req.query;
        const passwords = await Password.find({name});

        res.json(passwords);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
});

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
