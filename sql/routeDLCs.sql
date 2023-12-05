CREATE TABLE `tswmaps2_svelte_dev`.`routeDLCs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `acronym` VARCHAR(45) NULL,
  `name` VARCHAR(100) NULL,
  `nameShort` VARCHAR(85) NULL,
  `nameLong` VARCHAR(250) NULL,
  `nameAlternate` VARCHAR(85) NULL,
  `locale` VARCHAR(100) NULL,
  `releaseDate` VARCHAR(50) NULL,
  `country` TINYINT(1) NULL,
  `developer` TINYINT(1) NULL,
  `era` TINYINT(1) NULL,
  `powerType` TINYINT(1) NULL,
  `tsw1` TINYINT(1) NULL,
  `tsw2` TINYINT(1) NULL,
  `tsw3` TINYINT(1) NULL,
  `tsw4` TINYINT(1) NULL,
  PRIMARY KEY (`id`));