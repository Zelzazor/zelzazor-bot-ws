const { getDatabaseInstance } = require("../database");
const { getRoles } = require("../database/repositories/roles");
const { getPhoneNumberRoles } = require("../database/repositories/roles-subscribers");

const roles = async (body, _client, message) => {
  const db = await getDatabaseInstance();

  const args = body.split(' ');

  const subCommands = {
    "list": listRoles,
    "subscribe": subscribeToRole,
    "unsubscribe": unsubscribeFromRole,
    "create": createRole,
  }

  const subCommandArgs = [...args];
  subCommandArgs.splice(0, 1);

  if (!subCommands[args[0]]) {
    message.reply(`
!roles

Example usage: !roles subscribe eldenRing

Available commands:

create <roleName> - creates a role, spaces are not supported as of now.
subscribe <roleName> - subscribes yourself to an existing role.
unsubscribe <roleName> - unsubscribes you from a role.

You can mention roles using @<roleName>, example: @eldenRing.
  `);
    return;
  }

  try {
    await subCommands[args[0]](db, message, _client, subCommandArgs)
  }
  catch (error) {
    console.log("Roles command error: ", error);
  }
};

const listRoles = async (db, message, client, args) => {

}

const subscribeToRole = async (db, message, client, args) => {

}

const unsubscribeFromRole = async (db, message, client, args) => {

}

const createRole = async (db, message, client, args) => {

}

module.exports = roles;