'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  History.init({
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};