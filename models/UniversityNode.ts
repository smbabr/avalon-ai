import mongoose from 'mongoose';

const UniversityNodeSchema = new mongoose.Schema({
    nodeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    selection: {
        type: String,
        required: true
    },
    structure: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Active'
    },
    order: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.UniversityNode || mongoose.model('UniversityNode', UniversityNodeSchema);
