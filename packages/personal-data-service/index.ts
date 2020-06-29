import * as express from 'express';

import {connect} from './db-connection';
import {passwordRoute} from './route';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/name', (req, res) => {
    res.send('personal-data-service');
});

app.use('/api/v1/passwords', passwordRoute);

connect()
    .then(() => {
        app.listen(PORT, () => console.log('personal data service up'));
    });
