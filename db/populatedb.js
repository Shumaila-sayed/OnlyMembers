const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TYPE user_role AS ENUM ('guest', 'member', 'admin');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role user_role DEFAULT 'guest'
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE);
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});

	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('Done!');
}

main();
