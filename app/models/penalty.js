'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penalty extends Model {
    static associate(models) {
      Penalty.belongsTo(models.Member, {
        foreignKey: "MemberId",
        as: "member",
      });
    }
  }
  Penalty.init(
    {
      MemberId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Members",
          key: "code",
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Penalty",
      timestamps: false
    }
  );
  return Penalty;
};