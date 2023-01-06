const countdown = (time, unit = 'seconds') => {
    if(unit === 'milliseconds') time /= 1000

    const days = Math.floor((time) / 86400);
    const hours = Math.floor((time) / 3600) % 24;
    const minutes = Math.floor((time) / 60) % 60;
    const seconds = Math.floor((time) % 60);
      
    const daysString = days === 1 ? '1 day, ' : `${days} days, `;
    const hoursString = hours === 1 ? '1 hour, ' : `${hours} hours, `;
    const minutesString = minutes === 1 ? '1 minute and ' : `${minutes} minutes and `;
    
    return `${days > 0 ? daysString: ""}${hours > 0 ? hoursString : ""}${minutes > 0 ? minutesString : ""}${seconds} seconds`;
}

module.exports = { countdown };
