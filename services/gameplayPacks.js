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

async function writeNewGameplayPack(body) {
  console.log("CREATING NEW RECORD");
  await db.query(`INSERT INTO \`tswmaps2_svelte_dev\`.\`gameplayPacks\`
  (\`acronym\`, \`name\`, \`nameShort\`, \`nameLong\`, \`nameAlternate\`, \`locale\`, \`releaseDate\`,\`country\`,\`developer\`,\`era\`,\`powerType\`,\`tsw1\`,\`tsw2\`,\`tsw3\`,\`tsw4\`)
  VALUES
  ("${body.acronym}","${body.name}","${body.nameShort}","${body.nameLong}","${body.nameAlternate}","${body.locale}","${body.releaseDate}","${body.country}","${body.developer}","${body.era}","${body.powerType}","${body.tsw1}","${body.tsw2}","${body.tsw3}","${body.tsw4}");`);
}

module.exports = {
  getMultiple,
  writeNewGameplayPack
}
