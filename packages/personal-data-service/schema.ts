import {Schema, model} from 'mongoose';

const passwordSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

export const Password = model('Password', passwordSchema);