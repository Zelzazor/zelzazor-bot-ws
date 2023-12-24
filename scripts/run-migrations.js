const fs = require('fs');
const path = require('path');
const { getDatabaseInstance } = require('../database');
const saveDatabaseChanges = require('../utils/save-database-changes');

const migrationsDir = path.join(__dirname, '../database/migrations');

const runMigrations = async () => {
  try {
    const db = await getDatabaseInstance();

    const files = fs.readdirSync(migrationsDir);

    const sortedFiles = files.sort();

    for (const file of sortedFiles) {
      const migration = require(path.join(migrationsDir, file));
      if (migration.up) {
        console.log(`Running migration: ${file}`);
        await migration.up(db);
      }
    }

    await saveDatabaseChanges();

    console.log('All migrations executed successfully.');
  } catch (error) {
    console.error('Migration error:', error);
  }
};

runMigrations();