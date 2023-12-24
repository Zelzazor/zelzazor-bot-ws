const { getDatabaseInstance } = require("../database");
const { getRoles, insertRole } = require("../database/repositories/roles");
const { getRoleSubscriptions, subscribePhoneNumberToRole, unsubscribePhoneNumberToRole } = require("../database/repositories/roles-subscribers");

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

const listRoles = async (db, message, _client, args) => {
  if (args[0] === 'self') {
    const userSubscriptions = getRoleSubscriptions(db, message.author)

    if (userSubscriptions.length === 0) {
      message.reply("You aren't subscribed to any roles");
      return;
    }

    const reply = userSubscriptions.map(({ role_name }) => role_name).join('\n');
    message.reply(reply);
    return;
  };

  const roles = getRoles(db);

  if (roles.length === 0) {
    message.reply("There aren't any roles created yet, create one with `!roles create <roleName>`")
    return;
  }

  const reply = roles.join('\n');
  message.reply(reply);
}

const subscribeToRole = async (db, message, _client, args) => {

  if (args.length === 0) {
    message.reply('Need to provide a role with this command, example: `!roles subscribe eldenRing`')
    return
  }
  if (args.length > 1) {
    message.reply('Spaces are not allowed for role names, example: `!roles subscribe eldenRing`')
    return
  }

  const reply = subscribePhoneNumberToRole(db, extractLeadingNumbers(message.author), args[0]);

  message.reply(reply)
}

const unsubscribeFromRole = async (db, message, _client, args) => {
  if (args.length === 0) {
    message.reply('Need to provide a role with this command, example: `!roles unsubscribe eldenRing`')
    return
  }
  if (args.length > 1) {
    message.reply('Spaces are not allowed for role names, example: `!roles unsubscribe eldenRing`')
    return
  }

  const reply = unsubscribePhoneNumberToRole(db, extractLeadingNumbers(message.author), args[0]);

  message.reply(reply)
}

const createRole = async (db, message, _client, args) => {
  if (args.length === 0) {
    message.reply('Need to provide a role with this command, example: `!roles create eldenRing`')
    return
  }
  if (args.length > 1) {
    message.reply('Spaces are not allowed for role names, example: `!roles create eldenRing`')
    return
  }

  const reply = insertRole(db, args[0]);

  message.reply(reply);
}

module.exports = { roles };