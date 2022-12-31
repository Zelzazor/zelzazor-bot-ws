const {commandList} = require("../commands/index.js");

const commands = Object.keys(commandList);


const checkIfCommandExists = (command = "") => command !== "" && command.startsWith("!") && commands.includes(command.split(" ")[0].toLowerCase());


module.exports = { checkIfCommandExists };