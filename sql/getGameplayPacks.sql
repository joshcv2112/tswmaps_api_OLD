-- Gets all gameplay packs, subbing in any binary fields for the text value
SELECT gameplayPackDLCs.id, gameplayPackDLCs.acronym, gameplayPackDLCs.name, gameplayPackDLCs.nameShort,
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
  INNER JOIN tswmaps2_svelte_dev.powerTypes ON gameplayPackDLCs.powerType=powerTypes.id;