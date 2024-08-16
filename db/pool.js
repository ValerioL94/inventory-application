const { Pool } = require('pg');
require('dotenv').config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

module.exports = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});
