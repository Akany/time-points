import express, {json} from 'express';

import {router as authRoute} from './routes/auth';

const app = express();
const port = 3000;

app.use(json());

app
    .get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoute);

app
    .listen(port, () => console.log(`Example app listening on port ${port}!`));
