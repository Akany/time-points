import express from 'express';
import md5 from 'md5';
import {User} from '../schema/user.js';

export const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
    const users = await User.find();

    res.json(users);
});

userRouter.get('/users/:id', async (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            res.status(404);
            res.json({message: 'Cant find user'});
        }

        res.json(user);
    });
});

userRouter.post('/users', async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = new User({
            username,
            password: md5(password)
        });

        await user.save();

        res.json(user);
    } catch (error) {
        const {message} = error;

        res.status(400);
        res.json({message});
    }
});

userRouter.delete('/users', async (req, res) => {
    await User.remove();

    res.send();
});