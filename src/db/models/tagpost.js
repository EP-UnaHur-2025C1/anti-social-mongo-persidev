'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TagPost extends Model {
    static associate (models) {
      // No hace falta definir belongsToMany acá
      // Las relaciones se manejan desde Post y Tag
    }
  }

  TagPost.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TagPost',
    timestamps: false // para createdAt y updatedAt
  })

  return TagPost
}