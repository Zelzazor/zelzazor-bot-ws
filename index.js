#!/usr/bin/env node
const fs = require('fs');
const { checkIfCommandExists } = require('./utils/check-command');
const { commands } = require('./commands');
const { getData } = require('./utils/get-data');
const { everyone } = require('./commands/everyone.command');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
  },
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
  start(client);
});

if (!fs.existsSync('./data.json')) {
  fs.writeFileSync('./data.json', JSON.stringify({
    cooldown: false,
    timeEnd: 0
  }, null, 2));
}

let { cooldown, timeEnd } = getData();


/**
*     Function to start the bot
*     @param {Client} client
*     @returns {void}
*/
function start(client) {
  client.on('message', async (message) => {
    if (!checkIfCommandExists(message.body)) return;

    const result = await commands(message.body, client, message);
    
  });
}

client.initialize();