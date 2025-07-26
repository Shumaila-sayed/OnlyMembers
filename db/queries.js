const pool = require('./pool');

async function newUserPost(full_name, username, password, role) {
    await pool.query('INSERT INTO users (full_name, username, password, role) VALUES ($1, $2, $3, $4)', [full_name, username, password, role]);
}



module.exports = {
    newUserPost
}