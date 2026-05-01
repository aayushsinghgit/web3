const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'vaulta.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Referrals table
    db.run(`
        CREATE TABLE IF NOT EXISTS referrals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            referrer_address TEXT NOT NULL,
            referred_address TEXT UNIQUE NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Leaderboard view/helper
    db.run(`
        CREATE VIEW IF NOT EXISTS referral_rankings AS
        SELECT referrer_address, COUNT(*) as referral_count
        FROM referrals
        GROUP BY referrer_address
        ORDER BY referral_count DESC
    `);
});

module.exports = db;
