import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    year: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export const Car = new mongoose.model('Car', carSchema);
