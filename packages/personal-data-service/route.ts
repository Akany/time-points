import {Router, Request, Response, NextFunction} from 'express';

import {
    validateParams as validateGetParams,
    onGetHash
} from './controllers/get-password';
import {
    validateParams as validateGetAllPasswords,
    getAllPasswords
} from './controllers/get-passwords';
import {
    validateParams as validatePostParams,
    onPostHash
} from './controllers/post-password';

export const passwordRoute = Router();

passwordRoute.get('/', validateGetParams, onGetHash);
passwordRoute.get('/all', validateGetAllPasswords, getAllPasswords);
passwordRoute.post('/', validatePostParams, onPostHash);
passwordRoute.use(onError);

function onError(error: Error, req: Request, res: Response, next: NextFunction) {
    const {message} = error;

    res
        .status(500)
        .send({message});
}
