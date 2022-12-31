const venom = require('venom-bot');
const { checkIfCommandExists } = require('./utils/check-command');
const { commands } = require('./commands');

venom
  .create({
    session: 'zelzazor-bot', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });


/**
*     Function to start the bot
*     @param {venom.Whatsapp} client
*     @returns {void}
*/
function start(client) {
  client.onMessage(async (message) => {
    if(message.body && message.body.includes("!everyone")) {

        const members = await client.getGroupMembersIds(message.from);

        const mentioned = members.map((member) => {
            return `@${member.id.user}`;
        });

        client.sendMentioned(message.from, mentioned.join(" "), members.map((member) => member.id.user))
    }
    else if (checkIfCommandExists(message.body)) {
      const result = await commands(message.body, client, message);
      client.sendText(message.from, result);
    }
  });
}