import {Request, Response, NextFunction} from 'express';
import {Password} from '../schema';

export function validateParams(req: Request, res: Response, next: NextFunction) {
    if (!req.query.hasOwnProperty('user-id')) {
        throw new Error('Validation failed. user-id required.');
    }

    next();
}

export async function getAllPasswords(req: Request, res: Response, next: NextFunction) {
    const findParams = {
        userId: req.query['user-id']
    };

    try {
        const entities = await Password.find(findParams);

        res.json(entities);
    } catch (error) {
        next(error);
    }
}
