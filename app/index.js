const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`<h1>Ung dung Quan ly Nhan su (HRM)</h1><p>Ket noi Database thanh cong luc: ${result.rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send('Loi ket noi Database: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`HRM app listening on port ${port}`);
});
