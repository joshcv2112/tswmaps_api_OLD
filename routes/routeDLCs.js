const express = require('express');
const router = express.Router();
const routeDLCs = require('../services/routeDLCs');

/* GET route DLCS */
router.get('/', async function(req, res, next) {
    try {
        res.json(await routeDLCs.getRouteDLCs());
    } catch (err) {
        console.error(`Error while getting routeDLCs`);
        next(err);
    }
});

/* POST route DLCs */
router.post('/', async function(req, res, next) {
    res.send("POST Request Called!");

    try {
        res.json(await routeDLCs.writeNewRouteDLC(req.body));
    } catch (err) {
        console.error(`Error while writing new 'routeDLCs' record`, err.message);
        next(err);
    }
});

/* PUT route DLCS */
router.put('/', async function(req, res, next) {
    res.send("PUT Request Called!");

    try {
        res.json(await routeDLCs.updateRouteDLC(req.body));
    } catch (err) {
        console.error(`Error while updating 'routeDLCs' record`, err.message);
        next(err);
    }
});

module.exports = router;