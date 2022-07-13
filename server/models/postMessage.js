import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    address: String,
    name: String,
    creator: String,
    category: String,
    selectedFile: String,
    upvotes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;