import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Candidate', 'Interviewer'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });
export default mongoose.model('User', userSchema);
