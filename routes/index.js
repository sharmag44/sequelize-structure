
const { Router } = require('express');
const app = require('../api');
const middleware = require("../middleware/auth")
const router = Router();

router.get('/', (req, res) => res.send('Welcome to API'))

const { createPost, getAllPosts, getPostById, updatePost, deletePost } = app.posts;

router.post('/posts', middleware.checkToken, createPost);
router.get('/posts', middleware.checkToken, getAllPosts);
router.get('/posts/:id', middleware.checkToken, getPostById);
router.put('/posts/:id', middleware.checkToken, updatePost);
router.delete('/posts/:id', middleware.checkToken, deletePost);

module.exports = router;