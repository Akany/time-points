import {Router, Request, Response, NextFunction} from 'express';
import axios from 'axios';

import {getPersonalData} from './get-personal-data';
import {postPersonalData} from './post-personal-data';

const PERSONAL_DATA_SERVICE = process.env.PERSONAL_DATA_SERVICE;

export const personalDataRoute = Router();

/*
    @TODO
    add params validation
*/
personalDataRoute.get('/', getPersonalData, onError);
personalDataRoute.post('/', postPersonalData, onError);

function onError(error: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500);
    res.json(error);
}
