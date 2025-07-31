const db = require('../db/queries');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const validateUser = [

	body('fullname')
		.trim()
		.isLength({ min: 1, max: 20 })
		.withMessage(`Full name must be between 1 and 20 characters.`),
	body('username')
		.trim()
		.isLength({ min: 1, max: 10 })
		.withMessage('Username must be between 1 and 10 characters.')
		.custom(async (value) => {
			const existingUser = await db.findByUsername(value);
			if (existingUser) {
				throw new Error('This username is taken');
			}
		}),
	body('password')
		.isLength({ min: 4 })
		.withMessage('Password must be more than 4 characters.'),
	body('confirmPassword')
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage('Password does not match.'),
];

const signUpForm = (req, res) => {
	res.render('signUp');
};

const newUserPost = [
	validateUser,
    async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('signUp', {
				errors: errors.array(),
			});
        }
        
		try {
			const { fullname, username, password } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);
			
			if (!fullname || !username || !password) {
				res.status(404).send('User Inputs Not Found');
				return;
			}

			await db.newUserPost(fullname, username, hashedPassword);
			res.redirect('/');
		} catch (error) {
			console.log('Error creating user: ', error);
			res.status(500).send('Internal Server Error');
		}
	},
];

module.exports = {
	signUpForm,
	newUserPost,
};
