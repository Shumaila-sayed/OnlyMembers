const { Router } = require('express');
const postsController = require('../controllers/postsControllers');
const postsRouter = Router();

postsRouter.get('/', postsController.getAllPosts);
postsRouter.post('/', postsController.messagePost);
postsRouter.get('/:id', postsController.deletePost);

module.exports = postsRouter;
