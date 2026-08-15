// backend/api/register.js

const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Check if user already exists
            const existingUserQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (existingUserQuery.rows.length > 0) {
                return res.status(409).json({ message: 'Email already in use.' });
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into the database
            await pool.query(
                'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
                [email, hashedPassword]
            );

            res.status(201).json({ message: 'User registered successfully.' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

module.exports = handler;
