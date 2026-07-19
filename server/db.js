// server/db.js — PostgreSQL connection pool
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'therabot',
});

// Test connection on startup
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Connected to PostgreSQL (therabot)'))
    .catch(err => console.error('❌ PostgreSQL connection error:', err.message));

module.exports = pool;
