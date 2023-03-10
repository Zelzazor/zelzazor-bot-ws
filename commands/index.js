const { help } = require("./help.command");
const { uptime } = require("./uptime.command");


const commandList = {
    "!help": help,
    "!uptime": uptime,
    "!buggy": () => "ponki",
    "!version": () => "🤖 Zelzazor BOT: v0.0.1"
}

const commands = async (command, client, message) => {
    const result = await commandList[command.split(" ")[0].toLowerCase()](command.split(" ", 1).slice(1), client, message);
    return result;
}


module.exports = { commands, commandList };