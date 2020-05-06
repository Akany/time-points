import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

export const Password = new mongoose.model('Password', passwordSchema);