import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true
    },
    milage: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    }
});

export const Event = mongoose.model('Event', eventSchema);
