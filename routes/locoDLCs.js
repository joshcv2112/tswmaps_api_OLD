const express = require('express');
const router = express.Router();
const locoDLCs = require('../services/locoDLCs');

/* GET loco DLCS */
router.get('/', async function(req, res, next) {
    try {
        res.json(await locoDLCs.getLocoDLCs());
    } catch (err) {
        console.error(`Error while getting locoDLCs`);
        next(err);
    }
});

/* POST loco DLCs */
router.post('/', async function(req, res, next) {
    res.send("POST Request Called!");

    try {
        res.json(await locoDLCs.writeNewLocoDLC(req.body));
    } catch (err) {
        console.error(`Error while writing new 'locoDLCs' record`, err.message);
        next(err);
    }
});

/* PUT loco DLCS */
router.put('/', async function(req, res, next) {
    res.send("PUT Request Called!");

    try {
        res.json(await locoDLCs.updateLocoDLC(req.body));
    } catch (err) {
        console.error(`Error while updating 'locoDLCs' record`, err.message);
        next(err);
    }
});

module.exports = router;