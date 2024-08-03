const path = require("path");
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    models: path.resolve(__dirname, "../app/models"),
    migrations: path.resolve(__dirname, "../database/migrations"),
    seeders: path.resolve(__dirname, "../database/seeders"),
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    models: path.resolve(__dirname, "../app/models"),
    migrations: path.resolve(__dirname, "../database/migrations"),
    seeders: path.resolve(__dirname, "../database/seeders"),
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    models: path.resolve(__dirname, "../app/models"),
    migrations: path.resolve(__dirname, "../database/migrations"),
    seeders: path.resolve(__dirname, "../database/seeders"),
  },
};
