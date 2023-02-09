const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogKeyword extends Model {}

BlogKeyword.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      },
    },
    keyword_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'keyword',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'blogkeyword',
  }
);

module.exports = BlogKeyword;