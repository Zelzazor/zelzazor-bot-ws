const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const createSQLiteFile = async () => {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  const data = db.export();
  const buffer = Buffer.from(data);

  const directory = 'dist';
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const filePath = path.join(directory, 'database.sqlite');

  if (fs.existsSync(filePath)) {
    throw new Error(`There is already a SQLite file at ${filePath}`)
  }

  fs.writeFileSync(filePath, buffer);

  console.log(`SQLite file created at ${filePath}`);
}

createSQLiteFile().catch(err => {
  console.error('Failed to create SQLite file:', err);
});