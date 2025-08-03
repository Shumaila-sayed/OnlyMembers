const db = require('../db/queries');

const messagePost = async (req, res) => {
	try {
		const { title, content } = req.body;
		const user = req.user;

		if (!title || !content) {
			res.status(404).send('User Inputs Not Found');
			return;
		}
		await db.userMessagePost(title, content, user.id);

		res.redirect('/');
	} catch (error) {
		console.log('Error occurred posting', error);
		res.status(500).send('Internal Server Error');
	}
};

const getAllPosts = async (req, res) => {
	try {
		const messages = await db.getMessages();
		const updateMessages = await Promise.all(
			messages.map(async (row) => {
				const user = await db.getUserById(row.user_id);

				return {
					...row,
					name: user.username,
					created_at: new Date(row.created_at).toDateString().slice(4),
				};
			})
		);
		res.render('index', { messages: updateMessages });
	} catch (error) {
		console.log('Error getting messages', error);
		res.status(500).send('Internal server Error');
	}
};

const deletePost = async (req, res) => {
	try {
		const id  = parseInt(req.params.id);
		await db.deleteMessage(id);
		res.redirect('/posts');
	} catch (error) {
		console.log('Error Deleting Messages', error);
		res.status(500).send('Internal Server Error');		
	}
}

module.exports = { messagePost, getAllPosts, deletePost };
