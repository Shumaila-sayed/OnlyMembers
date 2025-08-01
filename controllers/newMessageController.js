const db = require('../db/queries');

const messagePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = locals.user.id;

        if (!title || !content) {
			res.status(404).send('User Inputs Not Found');
			return;
        }
        
        await db.userMessagePost(title, content, user_id);
        res.redirect('/');

    } catch (error) {
        console.log('Error occurred posting', error);
        res.status(500).send("Internal Server Error");
        
    }
}

module.exports = messagePost;