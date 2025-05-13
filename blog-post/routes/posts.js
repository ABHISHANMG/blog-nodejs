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
const { checkPermission, checkOwnership } = require('../middleware/roles');

// Public routes (viewer access)
router.route('/posts')
    .get(asyncHandler(handleGetPosts));

router.route('/posts/:id')
    .get(asyncHandler(handleGetPostById));

router.route('/posts/:id/comment')
    .get(asyncHandler(handleGetComments));

// Member and above routes
router.route('/posts')
    .post(checkPermission('create:post'), asyncHandler(handleCreatePost));

router.route('/posts/:id/like')
    .put(checkPermission('update:post'), asyncHandler(handleLikePost));

router.route('/posts/:id/dislike')
    .put(checkPermission('update:post'), asyncHandler(handleDislikePost));

router.route('/posts/:id/comment')
    .post(checkPermission('create:comment'), asyncHandler(handleCommentPost));

// Own resource management (member)
router.route('/posts/:id')
    .put(
        checkPermission('update:own:post'),
        checkOwnership('post'),
        asyncHandler(handleUpdatePost)
    )
    .delete(
        checkPermission('delete:own:post'),
        checkOwnership('post'),
        asyncHandler(handleDeletePost)
    );

router.route('/posts/:postId/comment/:commentId')
    .delete(
        checkPermission('delete:own:comment'),
        checkOwnership('comment'),
        asyncHandler(handleDeleteComment)
    );

// Admin/Editor routes
router.route('/posts/:id')
    .put(
        checkPermission('update:post'),
        asyncHandler(handleUpdatePost)
    )
    .delete(
        checkPermission('delete:post'),
        asyncHandler(handleDeletePost)
    );

router.route('/posts/:postId/comment/:commentId')
    .delete(
        checkPermission('delete:comment'),
        asyncHandler(handleDeleteComment)
    );

module.exports = router;
