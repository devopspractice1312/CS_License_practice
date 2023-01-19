'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
    email: DataTypes.STRING,
	  licencekey: DataTypes.STRING,
	  hardwareid: DataTypes.STRING,
	  macaddress: DataTypes.STRING,
    licencetype: DataTypes.STRING,
	  finishAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'customer',
  });
  return Customer;
};