const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// create our Comment model
class Comment extends Model {}

// create fields/columns for Comment model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id'
      }
    }
  },
{
  sequelize,
  modelName: 'comment',
});

module.exports = Comment;