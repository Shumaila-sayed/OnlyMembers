const pool = require('./pool');

async function newUserPost(fullname, username, password) {
	await pool.query(
		'INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3)',
		[fullname, username, password]
	);
}

async function findByUsername(value) {
	const { rows } = await pool.query(
		'SELECT EXISTS (SELECT 1 FROM users WHERE username = $1) AS "exists"',
		[value]
	);
	return rows[0].exists;
}

async function updateMembership(user) {
	await pool.query("UPDATE users SET role = 'member' WHERE username = $1", [
		user.username,
	]);
}

async function getUserByName(username) {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
		username,
	]);
	return rows[0];
}

async function getUserById(id) {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return rows[0];
}

async function userMessagePost(title, content, user_id) {
	await pool.query('INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)', [title, content, user_id]);
}

async function getMessages() {
	const { rows } = await pool.query('SELECT * FROM messages');
	return rows;
}


module.exports = {
	newUserPost,
	findByUsername,
	updateMembership,
	getUserByName,
	getUserById,
	userMessagePost,
	getMessages,
};
