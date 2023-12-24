const help = (_body, _client, message) => {
    return message.reply(`This is the help command! ⛑️

Commands:
    !help - Shows this message
    !uptime - Shows the uptime of the bot
    !version - Shows the version of the bot
    !roles - Shows the instructions for using roles
    !todos / !everyone - Mention everyone in the group

Made by Zelzazor`)
}

module.exports = { help };