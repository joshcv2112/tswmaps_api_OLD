const db = require('./db');
const helper = require('../helper');

/**
 * 
 */
async function getLocoDLCs() {
    console.log('Fetching all locoDLC records');
    const query = `SELECT * FROM tswmaps2_svelte_dev.locoDLCs;`;

    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);

    return data;
}

/**
 * 
 * @param {Array} body
 */
async function writeNewLocoDLC(body) {
    console.log('Creating new locoDLC record');

    // build query string
    let query = `INSERT INTO tswmaps2_svelte_dev.locoDLCs
    (acronym, name, nameShort, nameLong, nameAlternate, locale, releaseDate,country,developer,era,powerType,tsw1,tsw2,tsw3,tsw4) VALUES `;
    
    // add each object to the INSERT query
    body.forEach(element => {
        console.log(element);
        query += `("${element.acronym}","${element.name}","${element.nameShort}","${element.nameLong}","${element.nameAlternate}","${element.locale}","${element.releaseDate}","${element.country}","${element.developer}","${element.era}","${element.powerType}","${element.tsw1}","${element.tsw2}","${element.tsw3}","${element.tsw4}"),`;
    });
    

    // replace last char of query with a ';' then run INSERT query
    query = query.replace(/.$/,";");
    await db.query(query);
}

/**
 * 
 * @param {*} body 
 */
async function updateLocoDLC(body) {
    console.log('Updating existing Loco DLC record');
    
    // define sql query string
    let query = `UPDATE \`tswmaps2_svelte_dev\`.\`locoDLCs\` SET `;

    
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
    getLocoDLCs,
    writeNewLocoDLC,
    updateLocoDLC
}