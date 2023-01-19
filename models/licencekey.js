'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LicenceKey extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  LicenceKey.init({
    key: DataTypes.STRING,
    locked: DataTypes.BOOLEAN,
    expiry_mode: DataTypes.STRING,
    expiry_date: DataTypes.DATE,
    expires_in: DataTypes.INTEGER,
    company_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'licensekey',
  });
  return LicenceKey;
};

