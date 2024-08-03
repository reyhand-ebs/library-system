"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Members",
      [
        {
          code: "M001",
          name: "Angga",
        },
        {
          code: "M002",
          name: "Ferry",
        },
        {
          code: "M003",
          name: "Putri",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Members", null, {});
  },
};
