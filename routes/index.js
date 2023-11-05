
const { Router } = require('express');
const app = require('../api');
const auth = require("../middleware/auth")
const router = Router();

router.get('/', (req, res) => res.send('Welcome to API'))

router.post('/posts', auth.validateToken, app["posts"].createPost);
router.get('/posts', auth.validateToken, app["posts"].getAllPosts);
router.get('/posts/:id', auth.validateToken, app["posts"].getPostById);
router.put('/posts/:id', auth.validateToken, app["posts"].updatePost);
router.delete('/posts/:id', auth.validateToken, app["posts"].deletePost);

module.exports = router;