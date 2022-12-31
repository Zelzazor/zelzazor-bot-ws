const process = require('process');

const uptime = () => {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const seconds = Math.floor(uptime % 60);

    const uptimeDaysString = days === 1 ? '1 day, ' : `${days} days, `;
    const uptimeHoursString = hours === 1 ? '1 hour, ' : `${hours} hours, `;
    const uptimeMinutesString = minutes === 1 ? '1 minute and ' : `${minutes} minutes and `;

    return `🕑 Bot uptime: ${days > 0 ? uptimeDaysString: ""}${hours > 0 ? uptimeHoursString : ""}${minutes > 0 ? uptimeMinutesString : ""}${seconds} seconds`;
}

module.exports = { uptime };