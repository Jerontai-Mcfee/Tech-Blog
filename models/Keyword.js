// import the Model and Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');
// use the internal connection configuration
const sequelize = require('../config/connection');

class Keyword extends Model {}

Keyword.init(
  // model attributes
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    keyword_body: {
      type: DataTypes.STRING,
    },
  },
  // model options
  {
    // pass the connection instance
    sequelize,
    // choose the model name
    modelName: 'keyword',
  }
);

// export mudule as Keyword 
module.exports = Keyword;