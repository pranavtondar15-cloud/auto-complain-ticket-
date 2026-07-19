require('dotenv').config();
const pool = require('./src/config/db');
pool.query("ALTER TABLE departments ADD COLUMN IF NOT EXISTS phone VARCHAR(20)")
  .then(() => { console.log('Done'); process.exit(0); })
  .catch(e => { console.log('ERROR:', e.message); process.exit(1); });
