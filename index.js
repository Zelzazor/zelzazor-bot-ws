#!/usr/bin/env node
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
  },
});

const { commands } = require('./commands');
const { checkIfCommandExists } = require('./utils/check-command');

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
  start(client);
});



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