import mongoose, { Types } from "mongoose";

const DocumentSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Untitled Document',
    },
    content: {
        type: String,
        default: '',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    lastEdited: {
        type: Date,
        default: Date.now,
    },
});

const Document = mongoose.model('Document', DocumentSchema);

export default Document;