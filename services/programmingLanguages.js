const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM gameplayPacks LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

// TODO - another thing, make sure all existing tables are auto-incrementing.
//  (consider just deleting the gameplay packs one, that should be easy to add data back in)

// TODO - tomorrow, continue workshopping this to write DLC records to the DB
async function writeNewDLC(body) {
  console.log("CREATING NEW RECORD");
  await db.query(`INSERT INTO \`tswmaps2_svelte_dev\`.\`throwaway\` (\`name\`) VALUES ("${body.name}");`);
}

module.exports = {
  getMultiple,
  writeNewDLC
}