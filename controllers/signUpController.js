const db = require('../db/queries');

const signUpForm = (req, res) => {
    res.render('signUp')
}

const newUserPost = async (req, res) => {
    try {
        const [full_name, username, password] = req.user;
        if (!full_name || !username || !password) {
           res.status(404).send('User Inputs Not Found');
            return;
        }

        await db.newUserPost(full_name, username, password)
        res.redirect('/')
    } catch (error) {
        console.log('Error creating user: ', error);
		res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    signUpForm, newUserPost
}