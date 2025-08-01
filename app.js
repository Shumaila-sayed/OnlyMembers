require('dotenv').config();
const path = require('node:path')
const express = require('express');
const app = express();

const session = require('express-session');
const passport = require('./config/passport');

const signUpRouter = require('./routes/signUpRouter');
const membershipRouter = require('./routes/membershipRouter');
const loginRouter = require('./routes/loginRouter');
const newMessageRouter = require('./routes/newMessageRoute');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use('/newMessage', newMessageRouter);
app.use('/log-in', loginRouter);
app.use('/sign-up', signUpRouter);
app.use('/membership', membershipRouter)
app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`My Express app - listening on port ${PORT}!`);
});
