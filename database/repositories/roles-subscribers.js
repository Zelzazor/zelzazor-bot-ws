const saveDatabaseChanges = require("../../utils/save-database-changes");
const { getRoles } = require("./roles");

const getRoleSubscriptions = (db, { userPhoneNumber, roleName }) => {
  let sql = `SELECT * FROM role_subscribers`;
  const conditions = [];
  const valuesToBind = [];

  if (userPhoneNumber) {
    conditions.push("phone_number = ?");
    valuesToBind.push(userPhoneNumber);
  }

  if (roleName) {
    conditions.push("role_name = ?");
    valuesToBind.push(roleName);
  }

  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const stmt = db.prepare(sql);

  stmt.bind(valuesToBind);

  const roles = [];

  while (stmt.step()) {
    const row = stmt.getAsObject();
    roles.push({ ...row });
  }

  stmt.free();
  return roles;
}

const subscribePhoneNumberToRole = async (db, userPhoneNumber, roleName) => {
  const roleExists = getRoles(db, roleName).length > 0;

  if (!roleExists) {
    return `'${roleName}' does not exist yet, create it using !roles create ${roleName}.`;
  }

  const userSubscriptionExists = getRoleSubscriptions(db, { userPhoneNumber, roleName }).length > 0;

  if (userSubscriptionExists) {
    return `You are already subscribed to '${roleName}'.`;
  }

  const subscribeSql = `INSERT INTO role_subscribers (phone_number, role_name) VALUES (?, ?);`;
  stmt = db.prepare(subscribeSql);
  stmt.bind([userPhoneNumber, roleName]);
  stmt.step();
  stmt.free();

  await saveDatabaseChanges();

  return `You have been successfully subscribed to '${roleName}'!`;
}

const unsubscribePhoneNumberToRole = async (db, userPhoneNumber, roleName) => {
  const userSubscriptionExists = getRoleSubscriptions(db, { userPhoneNumber, roleName }).length > 0;

  if (!userSubscriptionExists) {
    return `You are not subscribed to '${roleName}'.`;
  }

  const subscribeSql = `DELETE FROM role_subscribers WHERE phone_number = ? AND role_name = ?;`;
  stmt = db.prepare(subscribeSql);
  stmt.bind([userPhoneNumber, roleName]);
  stmt.step();
  stmt.free();

  await saveDatabaseChanges();

  return `You have been successfully unsubscribed from '${roleName}'!`;
}


module.exports = {
  getRoleSubscriptions,
  subscribePhoneNumberToRole,
  unsubscribePhoneNumberToRole
}