const { getDatabaseInstance } = require("../database");
const { getRoleSubscriptions } = require("../database/repositories/roles-subscribers");

const mention = async (body, client, message) => {
  const chat = await message.getChat();
  const db = await getDatabaseInstance()
  const roleName = body;

  const phoneNumbers = getRoleSubscriptions(db, { roleName }).map(({ phone_number }) => phone_number);

  console.log({ phoneNumbers })

  const participantsSubscribed = chat.participants.filter((participant) => {
    return phoneNumbers.includes(participant.id.user)
  })

  if (participantsSubscribed.length === 0) return;

  const mentions = []

  const reply = await Promise.all(participantsSubscribed.map(async (participant) => {
    const contact = await client.getContactById(participant.id._serialized);
    mentions.push(contact.id._serialized);
    return `@${participant.id.user}`;
  }));

  await chat.sendMessage(reply.join(" "), { mentions })
}

module.exports = { mention }