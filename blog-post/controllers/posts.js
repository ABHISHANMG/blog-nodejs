const Posts = require('../models/postsSchema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { ObjectId } = mongoose.Types;

const handleCreatePost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId; // from middleware (e.g., verifyJwt)

    try {
        const newPost = new Posts({
            title,
            content,
            userId
        });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error("Create Post error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const handleGetPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Get Posts error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const handleGetPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Get Post by ID error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const handleUpdatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = await Posts.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Update Post error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const handleDeletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Posts.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error("Delete Post error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const handleLikePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes += 1;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error("Like Post error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const handleDislikePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.dislikes += 1;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error("Dislike Post error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const handleCommentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!comment || typeof comment !== 'string' || comment.trim() === '') {
            return res.status(400).json({ message: 'Comment must be a non-empty string' });
        }

        post.comments.push({ text: comment });
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.error("Comment Post error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const handleGetComments = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post.comments);
    } catch (error) {
        console.error("Get Comments error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const handleDeleteComment = async (req, res) => {
    const { postId, commentId } = req.params;
    try {
        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments = post.comments.filter(comment => {
            return comment && comment._id.toString() !== commentId;
        });

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error("Delete Comment error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}



const handleGetPostByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Posts.find({ userId });
        if (!posts) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error("Get Post by User ID error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    handleCreatePost,
    handleGetPosts,
    handleGetPostById,
    handleUpdatePost,
    handleDeletePost,
    handleLikePost,
    handleDislikePost,
    handleCommentPost,
    handleGetComments,
    handleDeleteComment,
    handleGetPostByUserId
};