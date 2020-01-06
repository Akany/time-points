import express from 'express';
import {Car} from '../schema/car.js';
import {Item} from '../schema/item.js';

export const carRouter = express.Router();

carRouter.get('/cars', async (req, res) => {
    const events = await Car.find();

    res.json(events);
});

carRouter.get('/cars/:id', async (req, res) => {
    Car.findById(req.params.id, (error, event) => {
        if (error) {
            res.status(404);
            res.json({message: 'Cant find car'});
        }

        res.json(event);
    });
});

carRouter.post('/cars', async (req, res) => {
    const {
        make,
        name,
        description,
        year,
        userId
    } = req.body;

    try {
        const car = new Car({make, name, description, year, userId});

        await car.save();

        res.json(car);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
});
