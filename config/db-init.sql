CREATE DATABASE `license-db`

CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `licencekey` varchar(255) NOT NULL,
  `hardwareid` varchar(255) NOT NULL,
  `macaddress` varchar(255) NOT NULL,
  `licencetype` varchar(255) DEFAULT NULL,
  `finishAt` datetime NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `licensekeys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `locked` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `brandings` (
	`id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL,
	`addin_name` varchar(255) DEFAULT NULL,
	`company_name` varchar(255) DEFAULT NULL,
	`company_site` varchar(255) DEFAULT NULL,
	`about_button_name` varchar(255) DEFAULT NULL,
	`settings_button_name` varchar(255) DEFAULT NULL,
	`encrypt_button_name` varchar(255) DEFAULT NULL,
	`decryptmessage_button_name` varchar(255) DEFAULT NULL,
	`decryptattachment_button_name` varchar(255) DEFAULT NULL,
	`securemail_group_name` varchar(255) DEFAULT NULL,
	`about_button_image` varchar(255) DEFAULT NULL,
	`settings_button_image` varchar(255) DEFAULT NULL,
	`encrypt_button_image` varchar(255) DEFAULT NULL,
	`decryptmessage_button_image` varchar(255) DEFAULT NULL,
	`decryptattachment_button_image` varchar(255) DEFAULT NULL,
	`logo_image` varchar(255) DEFAULT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `license-db`.`brandings`
(
`email`,
`addin_name`,
`company_name`,
`company_site`,
`about_button_name`,
`settings_button_name`,
`encrypt_button_name`,
`decryptmessage_button_name`,
`decryptattachment_button_name`,
`securemail_group_name`,
`about_button_image`,
`settings_button_image`,
`encrypt_button_image`,
`decryptmessage_button_image`,
`decryptattachment_button_image`,
`logo_image`,
`createdAt`,
`updatedAt`)
VALUES
(
"*",
"Hermes Secure Mail",
"Castle Shield Holdings, LLC",
"https://castle-shield.com",
"About",
"Settings",
"Encrypt",
"Decrypt Message",
"Decrypt Attachment",
"Secure Mail",
"/branding/about.png",
"/branding/settings.png",
"/branding/secure-mail.png",
"/branding/decrypt-mail.png",
"/branding/decrypt-attachment.png",
"/branding/main-icon.png",
now(),
now());
