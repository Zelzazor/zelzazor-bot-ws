module.exports = {
  up: async (db) => {
      const createRoleSubscribersTableQuery = `
          CREATE TABLE role_subscribers (
              phone_number TEXT,
              role_name TEXT,
              PRIMARY KEY (phone_number, role_name),
              FOREIGN KEY (role_name) REFERENCES roles(name)
          );
      `;
      await db.exec(createRoleSubscribersTableQuery);
  },

  down: async (db) => {
      const dropRoleSubscribersTableQuery = `DROP TABLE IF EXISTS role_subscribers;`;
      await db.exec(dropRoleSubscribersTableQuery);
  }
};