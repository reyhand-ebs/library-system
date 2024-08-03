'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MemberBooks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MemberId: {
        type: Sequelize.STRING,
        references: {
          model: "Members",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      BookId: {
        type: Sequelize.STRING,
        references: {
          model: "Books",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MemberBooks');
  }
};