const { Router } = require('express');
const passport = require('../config/passport');
const loginRouter = Router();

loginRouter.get('/', (req, res) => {
	res.render('login');
});

loginRouter.post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
}))

module.exports = loginRouter;