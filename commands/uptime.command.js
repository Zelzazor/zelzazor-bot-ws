const process = require('process');
const { countdown } = require('../utils/countdown');

const uptime = () => {
    const uptime = process.uptime();
    
    const timeLeft = countdown(uptime);

    return `🕑 Bot uptime: ${timeLeft}`;
}

module.exports = { uptime };