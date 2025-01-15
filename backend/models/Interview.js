import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    candidateName: {
        type: String,
        required: true
    },
    interviewerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    }, // Example: "10:00 AM - 11:00 AM"
    interviewType: {
        type: String,
        enum: ['Technical', 'HR', 'Behavioral'],
        required: true
    },
    email:{
        type:String,
        required:true

    }
}, { timestamps: true });

export default mongoose.model('Interview', interviewSchema);
