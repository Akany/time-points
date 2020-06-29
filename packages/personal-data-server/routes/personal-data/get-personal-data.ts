import {Request, Response, NextFunction} from 'express';

import {
    fetchPersonalData,
    GetPersonalDataParams
} from '../../services/personal-data';
import {
    mapToEntity,
    ResponseEntity
} from './map-to-entity';

const PERSONAL_DATA_SERVICE = process.env.PERSONAL_DATA_SERVICE;

export async function getPersonalData(req: Request, res: Response, next: NextFunction) {
    const serviceName = req.query['service-name'];
    const userId = req.query['user-id'];
    const requestParams: GetPersonalDataParams = {
        serviceName,
        userId
    };
    
    try {
        const entities: ResponseEntity[] = (await fetchPersonalData(requestParams))
            .map(mapToEntity);

        res.status(200);
        res.json(entities);
    } catch (error) {
        next(error);
    }
}
