const { getRoles } = require("./roles");

const getPhoneNumberRoles = (db, userPhoneNumber, roleName) => {
  const sql = roleName ? `SELECT role_name FROM role_subscribers WHERE phone_number = ? AND role_name = ?;` : `SELECT role_name FROM role_subscribers WHERE phone_number = ?;`;
  const stmt = db.prepare(sql);
  stmt.bind(roleName ? [userPhoneNumber, roleName] : [userPhoneNumber]);

  const roles = [];

  while (stmt.step()) {
    const row = stmt.getAsObject();
    roles.push(row.role_name);
  }


  console.log(roles)
  stmt.free();
  return roles;
}

const subscribePhoneNumberToRole = async (db, userPhoneNumber, roleName) => {
  const roleExists = getRoles(db, roleName).length > 0;

  if (!roleExists) {
    return `'${roleName}' does not exist yet, create it using !roles create ${roleName}.`;
  }

  const userSubscriptionExists = getPhoneNumberRoles(db, userPhoneNumber, roleName).length > 0;

  if (userSubscriptionExists) {
    return `You are already subscribed to '${roleName}'.`;
  }

  const subscribeSql = `INSERT INTO role_subscribers (phone_number, role_name) VALUES (?, ?);`;
  stmt = db.prepare(subscribeSql);
  stmt.bind([userPhoneNumber, roleName]);
  stmt.step();
  stmt.free();

  await saveDatabaseChanges(db);

  return `You have been successfully subscribed to '${roleName}'!`;
}

const unsubscribePhoneNumberToRole = async (db, userPhoneNumber, roleName) => {
  const userSubscriptionExists = getPhoneNumberRoles(db, userPhoneNumber, roleName).length > 0;

  if (!userSubscriptionExists) {
    return `You are not subscribed to '${roleName}'.`;
  }

  const subscribeSql = `DELETE FROM role_subscribers WHERE phone_number = ? AND role_name = ?;`;
  stmt = db.prepare(subscribeSql);
  stmt.bind([userPhoneNumber, roleName]);
  stmt.step();
  stmt.free();

  await saveDatabaseChanges(db);

  return `You have been successfully unsubscribed from '${roleName}'!`;
}


module.exports = {
  getPhoneNumberRoles,
  subscribePhoneNumberToRole,
  unsubscribePhoneNumberToRole
}