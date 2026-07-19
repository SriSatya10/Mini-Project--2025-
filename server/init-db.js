// server/init-db.js — Create all database tables
// Run once: node server/init-db.js

const pool = require('./db');

const createTables = async () => {
    try {
        // Users table — stores profile info from signup, name.html, age.html, zone2.html
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                uid VARCHAR(128) UNIQUE NOT NULL,
                email VARCHAR(255),
                nickname VARCHAR(100),
                age_group VARCHAR(10),
                zone_challenges TEXT[],
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('✅ Table "users" created');

        // Assessments table — stores initial chatbot assessment scores (SAD, PDD, OCD, PTSD)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS assessments (
                id SERIAL PRIMARY KEY,
                uid VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
                sad_score INTEGER DEFAULT 0,
                pdd_score INTEGER DEFAULT 0,
                ocd_score INTEGER DEFAULT 0,
                ptsd_score INTEGER DEFAULT 0,
                highest_category VARCHAR(10),
                answers JSONB,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('✅ Table "assessments" created');

        // Advanced assessments — stores detailed scores from star-rating forms (adv_ocd2.html etc.)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS advanced_assessments (
                id SERIAL PRIMARY KEY,
                uid VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
                disorder_type VARCHAR(10) NOT NULL,
                score INTEGER DEFAULT 0,
                responses JSONB,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('✅ Table "advanced_assessments" created');

        // Chat history — stores chat sessions
        await pool.query(`
            CREATE TABLE IF NOT EXISTS chat_history (
                id SERIAL PRIMARY KEY,
                uid VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
                session_id VARCHAR(50),
                messages JSONB,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('✅ Table "chat_history" created');

        console.log('\n🎉 All tables created successfully!');
    } catch (err) {
        console.error('❌ Error creating tables:', err.message);
    } finally {
        await pool.end();
    }
};

createTables();
