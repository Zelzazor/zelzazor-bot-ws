const initSqlJs = require('sql.js');
const fs = require('fs');

let dbInstance = null;

const initializeDb = async () => {
  if (!dbInstance) {
    const SQL = await initSqlJs();
    const data = fs.readFileSync('../dist/database.sqlite');
    dbInstance = new SQL.Database(data);
  }
  return dbInstance;
}

module.exports = initializeDb;