const process = require('process');
const { countdown } = require('../utils/countdown');

const uptime = (_body, _client, message) => {
    const uptime = process.uptime();

    const timeLeft = countdown(uptime);

    message.reply(`🕑 Bot uptime: ${timeLeft}`);
}

module.exports = { uptime };