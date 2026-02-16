import mongoose from 'mongoose';

const canvasSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled Canvas'
    },
    snapshot: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false 
    }
}, { timestamps: true });

const Canvas = mongoose.model('Canvas', canvasSchema);

export default Canvas;