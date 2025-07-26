require('dotenv').config();
const path = require('node:path')
const express = require('express');
const app = express();
const signUpRouter = require('./routes/signUpRouter')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/sign-up', signUpRouter);
app.get('/', (req, res) => res.send('Hello, world!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`My Express app - listening on port ${PORT}!`);
});
