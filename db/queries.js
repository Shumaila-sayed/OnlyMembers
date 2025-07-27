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

module.exports = {
	newUserPost,
	findByUsername,
};
