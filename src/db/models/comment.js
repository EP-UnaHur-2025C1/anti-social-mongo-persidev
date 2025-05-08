'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    commentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: { type: DataTypes.STRING, allowNull: false },
    publicationDate: { type: DataTypes.DATEONLY, allowNull: false },
    isVisible: {
      type: DataTypes.VIRTUAL(DataTypes.BOOLEAN, ['publicationDate']),
      get: function () {
        const xMonths = process.env.MONTHS || 6
        const yearDifference = new Date().getFullYear() - new Date(this.get('publicationDate')).getFullYear()
        const monthDifference = new Date().getMonth() - new Date(this.get('publicationDate')).getMonth()
        return (yearDifference * 12 + monthDifference) < xMonths
      }
    },
    userId: DataTypes.NUMBER,
    postId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false
  });
  return Comment;
};