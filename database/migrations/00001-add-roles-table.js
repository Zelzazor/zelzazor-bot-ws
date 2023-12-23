module.exports = {
  up: async (db) => {
      const createTableQuery = `
          CREATE TABLE roles (
              name TEXT PRIMARY KEY
          );
      `;
      await db.exec(createTableQuery);
  },
  
  down: async (db) => {
      const dropTableQuery = `DROP TABLE IF EXISTS roles;`;
      await db.exec(dropTableQuery);
  }
};