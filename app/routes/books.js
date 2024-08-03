const express = require("express");
const bookController = require("../controllers/bookController");
const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/:code", bookController.getBookById);
router.post("/", bookController.createBook);
router.put("/:code", bookController.updateBook);
router.delete("/:code", bookController.deleteBook);

module.exports = router;
