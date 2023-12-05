const express = require('express');
const router = express.Router();
const gameplayPacks = require('../services/gameplayPacks');

/* GET gameplay packs */
router.get('/', async function(req, res, next) {
  try {
    res.json(await gameplayPacks.getGameplayPacks());
  } catch (err) {
    console.error(`Error while getting gameplay packs`, err.message);
    next(err);
  }
});

/* POST gameplay packs */
router.post('/', async function(req, res, next) {
  res.send("POST Request Called!");
  
  try { 
    res.json(await gameplayPacks.writeNewGameplayPack(req.body));
  } catch (err) {
    console.error(`Error while writing new 'gameplay pack' record`, err.message);
    next(err);
  }
});

/* PUT gameplay packs*/
router.put('/', async function(req, res, next) {
  res.send("PUT Request Called!");
  
  try { 
    res.json(await gameplayPacks.updateGameplayPack(req.body));
  } catch (err) {
    console.error(`Error while updating 'gameplay pack' record`, err.message);
    next(err);
  }
});

module.exports = router;