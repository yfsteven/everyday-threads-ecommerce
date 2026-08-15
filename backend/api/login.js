// backend/api/login.js

const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('../dbConfig');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database to check if the user exists
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password stored in the database
        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // User authenticated successfully
        res.json({ message: 'User logged in successfully.', user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;
