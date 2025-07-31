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
	await pool.query("UPDATE users SET role = 'member' WHERE username = $1", [user.username]);
}

module.exports = {
	newUserPost,
	findByUsername,
	updateMembership,
};
