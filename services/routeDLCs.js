const db = require('./db');
const helper = require('../helper');

/**
 * 
 */
async function getRouteDLCs() {
    console.log('Fetching all routeDLC records');
    const query = `SELECT * FROM tswmaps2_svelte_dev.routeDLCs;`;

    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);

    return data;
}

/**
 * 
 * @param {Array} body
 */
async function writeNewRouteDLC(body) {
    console.log('Creating new routeDLC record');

    // build query string
    let query = `INSERT INTO tswmaps2_svelte_dev.routeDLCs
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
async function updateRouteDLC(body) {
    console.log('Updating existing routeDLC record');
    
    // define sql query string
    let query = `UPDATE \`tswmaps2_svelte_dev\`.\`routeDLCs\` SET `;

    
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
    getRouteDLCs,
    writeNewRouteDLC,
    updateRouteDLC
}