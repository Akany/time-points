import express, {json} from 'express';

import {router as authRoute} from './routes/auth';
import {personalDataRoute} from './routes/personal-data';

const app = express();
const port = 3000;

app.use(json());

app
    .get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoute);
app.use('/personal-data', personalDataRoute);

app
    .listen(port, () => console.log(`Example app listening on port ${port}!`));
