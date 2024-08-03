require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const { sequelize } = require("./app/models");

const app = express();
app.use(bodyParser.json());

app.get('/swagger.yaml', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'swagger.yaml'));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerUrl: '/swagger.yaml'
}));

app.use("/members", require("./app/routes/members"));
app.use("/books", require("./app/routes/books"));

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

module.exports = app;
