import {Request, Response, NextFunction} from 'express';

import {Password} from '../schema';

export function validateParams(req: Request, res: Response, next: NextFunction) {
    if (!isExist('service-name', req.body)) {
        return onRequired('service-name');
    }

    if (!isExist('user-id', req.body)) {
        return onRequired('user-id');
    }

    if (!isExist('hash', req.body)) {
        return onRequired('hash');
    }

    next();

    function onRequired(field: string) {
        next(new Error(`Validation failed. ${field} is required.`));
    }

    function isExist(field: string, source: Object): Boolean {
        return Boolean(source[field]);
    }
}

export async function onPostHash(req: Request, res: Response, next: NextFunction) {
    const {
        'service-name': name,
        'user-id' : userId,
        hash
    } = req.body;

    try {
        const password = new Password({
            name,
            userId,
            hash
        });
    
        await password.save();
    
        res.status(200);
        res.json(password);
    } catch (error) {
        next(error);
    }
}