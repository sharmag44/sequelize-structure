
const { Router } = require('express');
const app = require('../api');
const middleware = require("../middleware/auth")
const router = Router();

router.get('/', (req, res) => res.send('Welcome to API'))

const post = app.posts
router.post('/posts', middleware.checkToken, post.createPost);
router.get('/posts', middleware.checkToken, post.getAllPosts);
router.get('/posts/:id', middleware.checkToken, post.getPostById);
router.put('/posts/:id', middleware.checkToken, post.updatePost);
router.delete('/posts/:id', middleware.checkToken, post.deletePost);

module.exports = router;