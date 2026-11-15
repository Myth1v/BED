require('dotenv').config();

const dbconfig = {
    server: process.env.DB_SERVER,
    port: 1433,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        trustServerCertificate: true
    }
};
module.exports = dbconfig;