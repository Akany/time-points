import {connect as mongooseConnect} from 'mongoose';

const url = `mongodb://${process.env.MONGO}/personal-data`;
const options = {
    useNewUrlParser: true
};

export function connect() {
    return mongooseConnect(url, options);
}
