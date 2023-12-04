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

/**
 * Takes an array of objects from the request's JSON body 
 * and writes all objects to the gameplayPacks DB table
 * @param {Array} body 
 */
async function writeNewGameplayPack(body) {
  console.log("CREATING NEW RECORD");

  // build query string
  let query = `INSERT INTO \`tswmaps2_svelte_dev\`.\`gameplayPacks\`
  (\`acronym\`, \`name\`, \`nameShort\`, \`nameLong\`, \`nameAlternate\`, \`locale\`, \`releaseDate\`,\`country\`,\`developer\`,\`era\`,\`powerType\`,\`tsw1\`,\`tsw2\`,\`tsw3\`,\`tsw4\`) VALUES `;
  
  // add each object to the INSERT query
  body.forEach(element => {
    console.log(element);
    query += `("${element.acronym}","${element.name}","${element.nameShort}","${element.nameLong}","${element.nameAlternate}","${element.locale}","${element.releaseDate}","${element.country}","${element.developer}","${element.era}","${element.powerType}","${element.tsw1}","${element.tsw2}","${element.tsw3}","${element.tsw4}"),`;
  });
  
  // replace last char of query with a ';' then run INSERT query
  query = query.replace(/.$/,";");
  await db.query(query);
}

async function updateGameplayPack(body) {
  console.log('UPDATING EXISTING RECORD');

  // define sql query string
  let query = `UPDATE \`tswmaps2_svelte_dev\`.\`gameplayPacks\` SET `;

  // Add each property in the request body to the query (except id)
  for (const property in body) {
    if (property !== 'id') {
      query += `\`${property}\` = "${body[property]}" ,`;
    }
  }

  // remove the trailing ','
  query = query.replace(/.$/,"");
  
  // add WHERE condition then run UPDATE query
  query += `WHERE \`id\` = ${body.id};`;
  console.log(`\n${query}\n`);
  await db.query(query);
}

module.exports = {
  getMultiple,
  writeNewGameplayPack,
  updateGameplayPack
}
