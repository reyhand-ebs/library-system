"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MemberBook extends Model {
    static associate(models) {
      MemberBook.belongsTo(models.Member, {
        foreignKey: "MemberId",
        as: "member",
      });
      MemberBook.belongsTo(models.Book, {
        foreignKey: "BookId",
        as: "book",
      });
    }
  }
  MemberBook.init(
    {
      MemberId: {
        type: DataTypes.STRING,
        references: {
          model: "Members",
          key: "code",
        },
      },
      BookId: {
        type: DataTypes.STRING,
        references: {
          model: "Books",
          key: "code",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "MemberBook",
      timestamps: false,
    }
  );
  return MemberBook;
};
