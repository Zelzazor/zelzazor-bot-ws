const fs = require('fs');

const everyone = async (_body, client, message) => {

  const chat = await message.getChat();

  const mentions = []

  const mentioned = await Promise.all(chat.participants.map(async (participant) => {
    const contact = await client.getContactById(participant.id._serialized);
    mentions.push(contact.id._serialized);
    return `@${participant.id.user}`;
  }));


  await chat.sendMessage(mentioned.join(" "), { mentions })

  //client.sendText(message.from, "Everyone has been mentioned! 📣, no lo pongo para no molestar");

}

module.exports = { everyone };