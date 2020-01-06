import express from 'express';
import bodyParser from 'body-parser';

import {connect} from './db-connection.js';

import {eventRouter} from './routes/event.js';
import {carRouter} from './routes/car.js';

const app = express();
const port = process.env.PORT;

const appName = 'car-points-node';

app.use(bodyParser.json());
app.use(eventRouter);
app.use(carRouter);

app.listen(port, () => console.log(appName, `app listening on port ${port}!`));

connect()
	.then(() => console.log(appName, 'DB connected'))
	.catch((error) => console.log(appName, 'DB connection error:', error));