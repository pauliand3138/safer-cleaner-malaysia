import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, category } = req.query;
    
    try {
        const title = new RegExp(searchQuery, 'i');
        
        const posts = await PostMessage.find({ $or: [ { title }, { category }]});

        res.json({ data: posts });

    } catch (error) {
        res.json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.json(newPost);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.send('No post with that id');

    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.upvotes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.upvotes.push(req.userId);
    } else {
        post.upvotes = post.upvotes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}