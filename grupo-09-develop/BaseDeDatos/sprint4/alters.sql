ALTER TABLE `PI_GRUPO9`.`booking` 
ADD COLUMN `observations` VARCHAR(200) NULL DEFAULT 'No Observations' AFTER `checkout`,
ADD COLUMN `vaccineCovid19` TINYINT NULL DEFAULT 1 AFTER `observations`;

ALTER TABLE `PI_GRUPO9`.`product` 
ADD COLUMN `address` VARCHAR(100) NOT NULL DEFAULT 'Missing address' AFTER `description`;