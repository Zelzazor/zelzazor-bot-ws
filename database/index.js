const initializeDb = require("./db.js");

const db = initializeDb();

module.exports = { db }
