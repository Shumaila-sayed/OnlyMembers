require('dotenv').config();
const path = require('node:path')
const express = require('express');
const app = express();

const session = require('express-session');
const passport = require('./config/passport');

const signUpRouter = require('./routes/signUpRouter');
const membershipRouter = require('./routes/membershipRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use('/sign-up', signUpRouter);
app.use('/membership', membershipRouter)
app.get('/', (req, res) => res.send('Hello, world!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`My Express app - listening on port ${PORT}!`);
});
