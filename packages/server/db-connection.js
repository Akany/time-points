import mongoose from 'mongoose';

const url = 'mongodb://mongo:27017/test';
const options = {
    useNewUrlParser: true
};

export function connect() {
    return mongoose.connect(url, options);
}

