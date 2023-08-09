const https = require('https');
const http = require('http');
const fs = require('fs');
const app = require('./app');
const { pool } = require('../src/config/db.config');
// const { Pool, Client } = require('pg');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

// const pool = new Pool({
//     user: process.env.POSTGRESQL_DB_USER,
//     host: process.env.POSTGRESQL_DB_HOST,
//     database: process.env.POSTGRESQL_DB,
//     password: process.env.POSTGRESQL_DB_PASSWORD,
//     port: process.env.POSTGRESQL_DB_PORT
// })

// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })

// const client = new Client({
//     user: process.env.POSTGRESQL_DB_USER,
//     host: process.env.POSTGRESQL_DB_HOST,
//     database: process.env.POSTGRESQL_DB,
//     password: process.env.POSTGRESQL_DB_PASSWORD,
//     port: process.env.POSTGRESQL_DB_PORT
// })

async function createServer() {
    try{
        console.log("Start");
        await pool.connect().then(() => {console.log("Connect DB !!!");})
        http.createServer(app).listen(PORT, () => {
            console.log(`Server is listening in ${PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}

createServer()