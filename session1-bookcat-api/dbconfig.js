const sql = require('mssql')

const dbconfig = {
    server: 'localhost',
    database: 'NPBookstore',
    user:'sa',
    password: '00998877',
    options: {
        trustServerCertificate: true,
    }
};
module.exports = dbconfig;