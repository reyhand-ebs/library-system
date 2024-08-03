'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Penalties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MemberId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Members",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Penalties');
  }
};