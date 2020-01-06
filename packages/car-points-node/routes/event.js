import express from 'express';
import {Event} from '../schema/event.js';
import {Item} from '../schema/item.js';

export const eventRouter = express.Router();

eventRouter.get('/events', async (req, res) => {
    const events = await Event.find();

    res.json(events);
});

eventRouter.get('/events/:id', async (req, res) => {
    Event.findById(req.params.id, (error, event) => {
        if (error) {
            res.status(404);
            res.json({message: 'Cant find event'});
        }

        res.json(event);
    });
});

eventRouter.post('/events', async (req, res) => {
    const {
        event,
        milage,
        price,
        items,
        carId,
        userId
    } = req.body;

    const itemsModel$ = items
        .map(async ({name, description, price}) => {
            const itemModel = new Item({name, description, price});

            try {
                await itemModel.save();
            } catch(error) {
                res.json(error);
            }

            return itemModel;
        });

    const itemsModel = await Promise.all(itemsModel$);
    const itemIds = itemsModel
        .map((itemModel) => itemModel._id);

    try {
        const eventModel = new Event({
            event,
            milage,
            price,
            carId,
            userId,
            items: itemIds
        });

        await eventModel.save();

        res.json(eventModel);
    } catch (error) {
        res.send(error);
    }
});

eventRouter.delete('/events', async (req, res) => {
    await Event.remove();

    res.send();
});