const { Router } = require('express');
const postsController = require('../controllers/postsControllers');
const postsRouter = Router();

postsRouter.get('/', postsController.getAllPosts);
postsRouter.post('/', postsController.messagePost)

module.exports = postsRouter;