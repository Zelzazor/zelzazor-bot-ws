const { help } = require("./help.command");
const { uptime } = require("./uptime.command");
const { everyone } = require("./everyone.command");
const { gpt } = require("./gpt.command");


const commandList = {
    "!help": help,
    "!uptime": uptime,
    "!todos": everyone,
    "!everyone": everyone,
    "!buggy": (_body, _client, message) => message.reply("ponki"),
    "!version": (_body, _client, message) => message.reply("🤖 Zelzazor BOT: v0.0.1"),
    "!gpt": gpt,
}

const commands = async (command, client, message, openai) => {
    await commandList[command.split(" ")[0].toLowerCase()](command.split(" ").slice(1).join(" "), client, message, openai);
}


module.exports = { commands, commandList };