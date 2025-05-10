'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Post)
      User.hasMany(models.Comment, {
        foreignKey: {
          name: 'UserId',
          allowNull: false
        },
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  User.init({

    nickName: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  })
  return User
}
