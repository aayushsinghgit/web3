require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Register a new referral
app.post('/api/referrals', (req, res) => {
    const { referrer, referred } = req.body;

    if (!referrer || !referred) {
        return res.status(400).json({ error: 'Referrer and Referred addresses are required' });
    }

    if (referrer.toLowerCase() === referred.toLowerCase()) {
        return res.status(400).json({ error: 'Cannot refer yourself' });
    }

    const stmt = db.prepare(`INSERT INTO referrals (referrer_address, referred_address) VALUES (?, ?)`);
    stmt.run(referrer.toLowerCase(), referred.toLowerCase(), function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'This user has already been referred' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Referral recorded successfully' });
    });
});

// Get referral rankings (Leaderboard)
app.get('/api/referrals/rankings', (req, res) => {
    db.all(`SELECT referrer_address, COUNT(*) as count FROM referrals GROUP BY referrer_address ORDER BY count DESC LIMIT 10`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get personal referral count
app.get('/api/referrals/count/:address', (req, res) => {
    const { address } = req.params;
    db.get(`SELECT COUNT(*) as count FROM referrals WHERE referrer_address = ?`, [address.toLowerCase()], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row || { count: 0 });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Vaulta Backend running on http://localhost:${PORT}`);
});
