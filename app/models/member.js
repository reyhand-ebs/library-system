"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsToMany(models.Book, {
        through: "MemberBooks",
        foreignKey: "MemberId",
      });
    }
  }
  Member.init(
    {
      code: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Member",
      timestamps: false,
    }
  );

  return Member;
};
