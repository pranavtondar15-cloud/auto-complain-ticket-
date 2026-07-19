require('dotenv').config();
const pool = require('./src/config/db');
pool.query("UPDATE users SET role='admin' WHERE email='pranavtondar25@gmail.com'")
  .then(r => { console.log(r.rowCount ? 'Done! User is now admin.' : 'User not found.'); process.exit(0); })
  .catch(e => { console.log('ERROR:', e.message); process.exit(1); });
