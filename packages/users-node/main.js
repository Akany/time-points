import express from 'express';
import bodyParser from 'body-parser';

import {connect} from './db-connection.js';

import {userRouter} from './routes/user.js';
import {authRouter} from './routes/auth.js';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())

app.use(userRouter);
app.use(authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

connect()
	.then(() => console.log('DB connected'))
	.catch((error) => console.log('DB connection error:', error));