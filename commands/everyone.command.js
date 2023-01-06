const fs = require('fs');

const everyone = async (client, message, cooldown, timeEnd, countdown) => {
    if(cooldown) {
        client.sendText(message.from, `!everyone Cooldown: ${countdown(timeEnd-Date.now(), 'milliseconds')}`);
        return;
    }

    const members = await client.getGroupMembersIds(message.from);

    const mentioned = members.map((member) => {
        return `@${member.id.user}`;
    });

    client.sendMentioned(message.from, mentioned.join(" "), members.map((member) => member.id.user))

    //client.sendText(message.from, "Everyone has been mentioned! 📣, no lo pongo para no molestar");

    cooldown = true;
    timeEnd = Date.now() + 1000 * 60 * 60;

    fs.writeFile('./data.json', JSON.stringify({
      cooldown,
      timeEnd
    }, null, 2), (err) => {
      if(err) console.log(err);
    })
    

    setTimeout(() => {
      cooldown = false;
      timeEnd = 0;
      fs.writeFile('./data.json', JSON.stringify({
        cooldown,
        timeEnd
      }, null, 2), (err) => {
        if(err) console.log(err);
      })
    } , timeEnd - Date.now());
}

module.exports = { everyone };