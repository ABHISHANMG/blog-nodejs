const {    handleCreatePost,
    handleGetPosts,
    handleGetPostById,
    handleUpdatePost,
    handleDeletePost,
    handleLikePost,
    handleDislikePost,
    handleCommentPost,
    handleGetComments,
    handleDeleteComment,
    handleGetPostByUserId} = require('../controllers/posts');

const express = require('express');
const router = express.Router();

router.route('/posts').post(handleCreatePost).get(handleGetPosts);
router.route('/posts/:id').get(handleGetPostById).put(handleUpdatePost).delete(handleDeletePost);
router.route('/posts/:id/like').put(handleLikePost);
router.route('/posts/:id/dislike').put(handleDislikePost);
router.route('/posts/:id/comment').post(handleCommentPost);
router.route('/posts/:id/comment').get(handleGetComments);
router.route('/posts/:userId').get(handleGetPostByUserId);
router.route('/posts/:postId/comment/:commentId').delete(handleDeleteComment);



module.exports = router;
