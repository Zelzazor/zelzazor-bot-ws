const process = require('process');
const { countdown } = require('../utils/countdown');

const uptime = (_body, message, _client) => {
    const uptime = process.uptime();

    const timeLeft = countdown(uptime);

    message.reply(`🕑 Bot uptime: ${timeLeft}`);
}

module.exports = { uptime };