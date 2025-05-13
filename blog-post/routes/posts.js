const {
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
} = require('../controllers/posts');

const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

router.route('/posts')
    .post(asyncHandler(handleCreatePost))
    .get(asyncHandler(handleGetPosts));

router.route('/posts/:id')
    .get(asyncHandler(handleGetPostById))
    .put(asyncHandler(handleUpdatePost))
    .delete(asyncHandler(handleDeletePost));

router.route('/posts/:id/like')
    .put(asyncHandler(handleLikePost));

router.route('/posts/:id/dislike')
    .put(asyncHandler(handleDislikePost));

router.route('/posts/:id/comment')
    .post(asyncHandler(handleCommentPost))
    .get(asyncHandler(handleGetComments));

router.route('/posts/:userId')
    .get(asyncHandler(handleGetPostByUserId));

router.route('/posts/:postId/comment/:commentId')
    .delete(asyncHandler(handleDeleteComment));

module.exports = router;
