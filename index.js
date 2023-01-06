#!/usr/bin/env node
const fs = require('fs');
const venom = require('venom-bot');
const { checkIfCommandExists } = require('./utils/check-command');
const { commands } = require('./commands');
const { countdown } = require('./utils/countdown');
const { getData } = require('./utils/get-data');
const { everyone } = require('./commands/everyone.command');

if(!fs.existsSync('./data.json')) {
  fs.writeFileSync('./data.json', JSON.stringify({
      cooldown: false,
      timeEnd: 0
  }, null, 2));
}

let { cooldown, timeEnd } = getData();

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
    if(message.body && message.body.includes("!todos")) {
      await everyone(client, message, cooldown, timeEnd, countdown);
    }
    else if (checkIfCommandExists(message.body)) {
      const result = await commands(message.body, client, message);
      client.sendText(message.from, result);
    }
  });
}