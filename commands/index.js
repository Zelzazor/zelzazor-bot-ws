const { help } = require("./help.command");
const { uptime } = require("./uptime.command");
const { everyone } = require("./everyone.command");


const commandList = {
    "!help": help,
    "!uptime": uptime,
    "!todos": everyone,
    "!everyone": everyone,
    "!buggy": (_body, _client, message) => message.reply("ponki"),
    "!version": (_body, _client, message) => message.reply("🤖 Zelzazor BOT: v0.0.1")
}

const commands = async (command, client, message) => {
    await commandList[command.split(" ")[0].toLowerCase()](command.split(" ", 1).slice(1), client, message);
}


module.exports = { commands, commandList };