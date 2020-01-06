import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    lastAccess: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const Auth = new mongoose.model('Auth', authSchema);
