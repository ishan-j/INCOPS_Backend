const db = require('../config/db');

class User {
    // Save user to DB
    static async create(email, password) {
        const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        return db.execute(sql, [email, password]);
    }

    // Find user by email
    static async findByEmail(email) {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    }
}

module.exports = User;