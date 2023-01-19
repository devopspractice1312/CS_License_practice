'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branding extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Branding.init({
    email: DataTypes.STRING,
    addin_name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_site: DataTypes.STRING,
    about_button_name: DataTypes.STRING,
    settings_button_name: DataTypes.STRING,
    encrypt_button_name: DataTypes.STRING,
    decryptmessage_button_name: DataTypes.STRING,
    decryptattachment_button_name: DataTypes.STRING,
    securemail_group_name: DataTypes.STRING,
    about_button_image: DataTypes.STRING,
    settings_button_image: DataTypes.STRING,
    encrypt_button_image: DataTypes.STRING,
    decryptmessage_button_image: DataTypes.STRING,
    decryptattachment_button_image: DataTypes.STRING,
    logo_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'branding',
  });
  return Branding;
};