#!/usr/bin/env node
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const OpenAI = require('openai');
require('dotenv').config()

const { commands } = require('./commands');
const { checkIfCommandExists } = require('./utils/check-command');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

const clientMessageEvent = process.env.NODE_ENV === "production" ? "message" : "message_create"

/**
*     Function to start the bot
*     @param {Client} client
*     @returns {void}
*/
function start(client) {
  client.on(clientMessageEvent, (message) => {
    if (!checkIfCommandExists(message.body)) return;

    commands(message.body, client, message, openai);

  });
}

client.initialize();