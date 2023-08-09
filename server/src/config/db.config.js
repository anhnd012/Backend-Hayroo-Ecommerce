const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();


const pool = new Pool({
  user: process.env.POSTGRESQL_DB_USER,
  host: process.env.POSTGRESQL_DB_HOST,
  database: process.env.POSTGRESQL_DB,
  password: process.env.POSTGRESQL_DB_PASSWORD,
  port: process.env.POSTGRESQL_DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};