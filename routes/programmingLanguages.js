const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  res.send("POST Request Called!");
  try { 
    res.json(await programmingLanguages.writeNewDLC(req.body));
  } catch (err) {
    console.error(`Error while writing new record `, err.message);
    next(err);
  }
});

module.exports = router;