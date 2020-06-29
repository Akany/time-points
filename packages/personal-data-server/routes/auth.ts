import {Router, Request, Response} from 'express';
import axios from 'axios';

export const router = Router();
const AUTH_SERVICE = process.env.AUTH_SERVICE;

router.post('/', (req: Request, res: Response) => {
    axios
        .post(`${AUTH_SERVICE}/auth`, req.body)
        .then((response) => {
            res.send(response.data);
        })
        .catch((result) => {
            res.status(404);
            res.send('Failed');
        });
});
