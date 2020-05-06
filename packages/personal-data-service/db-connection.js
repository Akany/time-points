import mongoose from 'mongoose';

const url = `mongodb://${process.env.MONGO}/test`;
const options = {
    useNewUrlParser: true
};

export function connect() {
    return mongoose.connect(url, options);
}
