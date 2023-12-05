const db = require('./db');
const helper = require('../helper');

/**
 * Gets all of the gameplay pack objects from the DB
 */
async function getMultiple(){
  const query = `SELECT gameplayPackDLCs.id, gameplayPackDLCs.acronym, gameplayPackDLCs.name, gameplayPackDLCs.nameShort,
  gameplayPackDLCs.nameLong, gameplayPackDLCs.nameAlternate, gameplayPackDLCs.locale, gameplayPackDLCs.releaseDate,
  countries.name AS country,
  developers.name AS developer,
  eras.name AS era,
  powerTypes.name AS powerType,
  tsw1, tsw2, tsw3, tsw4
  FROM tswmaps2_svelte_dev.gameplayPackDLCs 
  INNER JOIN tswmaps2_svelte_dev.countries ON gameplayPackDLCs.country=countries.id
  INNER JOIN tswmaps2_svelte_dev.developers ON gameplayPackDLCs.developer=developers.id
  INNER JOIN tswmaps2_svelte_dev.eras ON gameplayPackDLCs.era=eras.id
  INNER JOIN tswmaps2_svelte_dev.powerTypes ON gameplayPackDLCs.powerType=powerTypes.id;`;

  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);

  return data;
}

/**
 * Takes an array of objects from the request's JSON body 
 * and writes all objects to the gameplayPackDLCs DB table
 * @param {Array} body 
 */
async function writeNewGameplayPack(body) {
  console.log("CREATING NEW RECORD");

  // build query string
  let query = `INSERT INTO \`tswmaps2_svelte_dev\`.\`gameplayPackDLCs\`
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
  let query = `UPDATE \`tswmaps2_svelte_dev\`.\`gameplayPackDLCs\` SET `;

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
