import {Router, Request, Response} from 'express';
import axios from 'axios';

const PERSONAL_DATA_SERICE = process.env.PERSONAL_DATA_SERICE;

export const personalDataRoute = Router();

personalDataRoute
    .get('/', (req: Request, res: Response) => {
        const {name} = req.query;

        axios
            .get(`${PERSONAL_DATA_SERICE}/api/v1/password?name=${name}`)
            .then((response) => {
                res.send(response.data);
            })
            .catch((result) => {
                res.status(404);
                res.send(result);
                // res.send('Failed');
            });
    });

personalDataRoute
    .post('/', async (req: Request, res: Response) => {
        try {
            const response = await axios
                .post(`${PERSONAL_DATA_SERICE}/api/v1/password`, req.body);

            res.json(response.data);
        } catch(error) {
            console.log(error.message);
            // res.status(404);
            res.send(error.message);
            // res.send('Failed');
        }
    });
