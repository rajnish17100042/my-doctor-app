-- table creation for admin registration 
CREATE TABLE `my-doctor`.`admin_registration` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(13) NOT NULL , `address` TEXT NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `joining_date` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `email` (`email`)) ENGINE = InnoDB;


-- table creation for doctor registration  
CREATE TABLE `my-doctor`.`doctor_registration` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(13) NOT NULL , `address` TEXT NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `pincode` VARCHAR(25) NOT NULL , `joining_date` VARCHAR(100) NOT NULL , `specialisation` VARCHAR(100) NOT NULL , `experience` VARCHAR(100) NOT NULL , `password` VARCHAR(255) NOT NULL , `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `email` (`email`)) ENGINE = InnoDB;


-- table creation for patient registration 
CREATE TABLE `my-doctor`.`patient_registration` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(13) NOT NULL , `address` TEXT NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `appointment_date` VARCHAR(255) NOT NULL , `symptoms` TEXT NOT NULL , `doctor` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `registered_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `email` (`email`)) ENGINE = InnoDB;