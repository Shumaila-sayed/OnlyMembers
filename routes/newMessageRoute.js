const { Router } = require('express');
const newMessageRouter = Router();
const newMessageController = require('../controllers/newMessageController');

newMessageRouter.post('/', newMessageController);

module.exports = newMessageRouter;