import {Request, Response, NextFunction} from 'express';

import {
    createPersonalData,
    CreatePersonalDataParams,
    DBEntity
} from '../../services/personal-data';
import {mapToEntity} from './map-to-entity';

export async function postPersonalData(req: Request, res: Response, next: NextFunction) {
    const requestParams: CreatePersonalDataParams = {
        userId: req.body['user-id'],
        serviceName: req.body['service-name'],
        /*
            @TODO
            Add encryption
        */
        hash: req.body['password']
    };
    
    try {
        const entity: DBEntity = await createPersonalData(requestParams);

        res.status(200);
        res.json(mapToEntity(entity));

    } catch (error) {
        next(error);
    }
}