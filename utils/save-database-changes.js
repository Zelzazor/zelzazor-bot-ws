const { getDatabaseInstance} = require("../database")
const fs = require('fs');

const saveDatabaseChanges =  async() => {
  try {
    const db = await getDatabaseInstance();

    const data = db.export();
    fs.writeFileSync('dist/database.sqlite', Buffer.from(data));
    console.log("Current Database Instance state has been saved");
  }
  catch(error) {
    console.error("Saving procedure error: ", error);
  }
}

module.exports = saveDatabaseChanges;