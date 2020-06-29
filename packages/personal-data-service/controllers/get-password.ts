import {Request, Response, NextFunction} from 'express';
import {Password} from '../schema';

export function validateParams(req: Request, res: Response, next: NextFunction) {
    if (!isExist('user-id', req.query)) {
        return onRequired('user-id');
    }

    if (!isExist('service-name', req.query)) {
        return onRequired('service-name');
    }

    next();

    function onRequired(field: string) {
        next(new Error(`Validation failed. ${field} is required.`));
    }

    function isExist(field: string, source: Object): Boolean {
        return Boolean(field in source);
    }
}

export async function onGetHash(req: Request, res: Response, next: NextFunction) {
    const name = req.query['service-name'];
    const userId = req.query['user-id'];

    const findParams = {
        name,
        userId
    };

    try {
        const entity = await Password.find(findParams);

        res.json(entity);
    } catch (error) {
        next(error);
    }
}
