const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require('../controllers/signUpController');

signUpRouter.get('/', signUpController.signUpForm);
signUpRouter.post('/', signUpController.newUserPost);

module.exports = signUpRouter;