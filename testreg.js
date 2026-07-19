require('dotenv').config();
const pool = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function test() {
  try {
    const hash = await bcrypt.hash('test123', 10);
    const { rows } = await pool.query(
      'INSERT INTO users (name,email,phone,password) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role',
      ['Test User', 'test@test.com', '1234567890', hash]
    );
    console.log('Register OK:', rows[0]);
  } catch(e) {
    console.log('Register ERROR:', e.message);
  }
  process.exit(0);
}
test();
