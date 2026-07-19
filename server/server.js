// server/server.js — Express API server for TheraBot
const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS) from the root directory
// This allows a single-platform deployment (like Render) to host both backend and frontend
app.use(express.static(require('path').join(__dirname, '..')));

// ========================
// USER ROUTES
// ========================

// POST /api/users — Create or update a user profile
app.post('/api/users', async (req, res) => {
    try {
        const { uid, email, nickname, ageGroup, zoneChallenges } = req.body;

        if (!uid) {
            return res.status(400).json({ error: 'uid is required' });
        }

        const result = await pool.query(
            `INSERT INTO users (uid, email, nickname, age_group, zone_challenges)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (uid) DO UPDATE SET
                email = COALESCE($2, users.email),
                nickname = COALESCE($3, users.nickname),
                age_group = COALESCE($4, users.age_group),
                zone_challenges = COALESCE($5, users.zone_challenges),
                updated_at = NOW()
             RETURNING *`,
            [uid, email || null, nickname || null, ageGroup || null, zoneChallenges || null]
        );

        res.status(201).json({ status: 'success', user: result.rows[0] });
    } catch (err) {
        console.error('Error creating/updating user:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/users/:uid — Get user profile
app.get('/api/users/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE uid = $1', [uid]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ========================
// ASSESSMENT ROUTES
// ========================

// POST /api/assessments — Save initial chatbot assessment
app.post('/api/assessments', async (req, res) => {
    try {
        const { uid, sadScore, pddScore, ocdScore, ptsdScore, highestCategory, answers } = req.body;

        if (!uid) {
            return res.status(400).json({ error: 'uid is required' });
        }

        const result = await pool.query(
            `INSERT INTO assessments (uid, sad_score, pdd_score, ocd_score, ptsd_score, highest_category, answers)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [uid, sadScore || 0, pddScore || 0, ocdScore || 0, ptsdScore || 0, highestCategory || null, JSON.stringify(answers) || null]
        );

        res.status(201).json({ status: 'success', assessment: result.rows[0] });
    } catch (err) {
        console.error('Error saving assessment:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/assessments/:uid — Get all assessments for a user
app.get('/api/assessments/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await pool.query(
            'SELECT * FROM assessments WHERE uid = $1 ORDER BY created_at DESC',
            [uid]
        );

        res.json({ assessments: result.rows });
    } catch (err) {
        console.error('Error fetching assessments:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ========================
// ADVANCED ASSESSMENT ROUTES
// ========================

// POST /api/advanced-assessments — Save advanced assessment (OCD/SAD/PTSD/PDD detailed)
app.post('/api/advanced-assessments', async (req, res) => {
    try {
        const { uid, disorderType, score, responses } = req.body;

        if (!uid || !disorderType) {
            return res.status(400).json({ error: 'uid and disorderType are required' });
        }

        const result = await pool.query(
            `INSERT INTO advanced_assessments (uid, disorder_type, score, responses)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [uid, disorderType, score || 0, JSON.stringify(responses) || null]
        );

        res.status(201).json({ status: 'success', advancedAssessment: result.rows[0] });
    } catch (err) {
        console.error('Error saving advanced assessment:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/advanced-assessments/:uid — Get all advanced assessments for a user
app.get('/api/advanced-assessments/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await pool.query(
            'SELECT * FROM advanced_assessments WHERE uid = $1 ORDER BY created_at DESC',
            [uid]
        );

        res.json({ advancedAssessments: result.rows });
    } catch (err) {
        console.error('Error fetching advanced assessments:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ========================
// CHAT HISTORY ROUTES
// ========================

// POST /api/chat-history — Save a chat session
app.post('/api/chat-history', async (req, res) => {
    try {
        const { uid, sessionId, messages } = req.body;

        if (!uid) {
            return res.status(400).json({ error: 'uid is required' });
        }

        const result = await pool.query(
            `INSERT INTO chat_history (uid, session_id, messages)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [uid, sessionId || `session_${Date.now()}`, JSON.stringify(messages) || '[]']
        );

        res.status(201).json({ status: 'success', chatHistory: result.rows[0] });
    } catch (err) {
        console.error('Error saving chat history:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/chat-history/:uid — Get all chat history for a user
app.get('/api/chat-history/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await pool.query(
            'SELECT * FROM chat_history WHERE uid = $1 ORDER BY created_at DESC',
            [uid]
        );

        res.json({ chatHistory: result.rows });
    } catch (err) {
        console.error('Error fetching chat history:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ========================
// HEALTH CHECK
// ========================
app.get('/api/health', async (req, res) => {
    try {
        const dbResult = await pool.query('SELECT NOW()');
        res.json({
            status: 'ok',
            server: 'running',
            database: 'connected',
            timestamp: dbResult.rows[0].now
        });
    } catch (err) {
        res.status(500).json({ status: 'error', database: 'disconnected' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 TheraBot API server running at http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
