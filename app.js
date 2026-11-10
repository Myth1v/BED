const express = require('express');
const app = express();
const sql = require('mssql');
app.get('/', (req, res) => {
res.send('Welcome to the Book Category API');
});


app.listen(3000, () => {
console.log('Listening on port 3000');
});

app.get('/categories', (req, res) => {
res.json([
{ id: 1, name: 'Fiction' },
{ id: 2, name: 'Non-Fiction' },
{ id: 3, name: 'Biography' }
]);
});



app.get('/db-test', async (req, res) => {
try {
const pool = await sql.connect({
  server: 'localhost',
  port: 1433,
  database: 'NPBookstore',
  user: 'dbuser',
  password: '00998877',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
});
const result = await pool.request()
.query('SELECT COUNT(*) AS Total FROM Author');
await pool.close();
res.json({ connected: true, authors: result.recordset[0].Total });
} catch (err) {
    console.log(err)
res.status(500).json({ connected: false, error: err.message });
}
});






