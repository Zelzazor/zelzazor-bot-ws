const saveDatabaseChanges = require("../../utils/save-database-changes");

const getRoles = (db, roleName) => {
  const sql = roleName ? `SELECT name FROM roles WHERE name = ?;` : `SELECT name FROM roles;`;
  const stmt = db.prepare(sql);

  if (roleName) stmt.bind([roleName]);

  const roles = [];

  while (stmt.step()) {
    const row = stmt.getAsObject();
    roles.push(row.name);
  }

  stmt.free();
  return roles;
}

const insertRole = async (db, roleName) => {
  const roleExists = getRoles(db, roleName).length > 0;

  if (roleExists) {
    return `${roleName} already exists.`
  }

  const sql = `INSERT INTO roles (name) VALUES (?);`;
  const stmt = db.prepare(sql);

  stmt.bind([roleName]);

  stmt.run();

  stmt.free();

  await saveDatabaseChanges(db);

  return `${roleName} has been successfully created.`;

}

module.exports = {
  getRoles, insertRole
}