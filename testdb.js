require('dotenv').config();
const pool = require('./src/config/db');
pool.query('SELECT 1')
  .then(() => { console.log('DB OK'); process.exit(0); })
  .catch(e => { console.log('DB ERROR:', e.message); process.exit(1); });
