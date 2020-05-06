import express from 'express';

import {connect} from './db-connection.js';
import {passwordRoute} from './route.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/name', (req, res) => {
    res.send('personal-data-service');
});

app.use('/api/v1/password', passwordRoute);

connect()
    .then(() => {
        app.listen(PORT, () => console.log('personal data service up'));
    });
