const express = require("express");
const memberController = require("../controllers/memberController");
const router = express.Router();

router.get("/", memberController.getAllMembers);
router.post("/", memberController.createMember);
router.get("/:code", memberController.getMemberById);
router.put("/:code", memberController.updateMember);
router.delete("/:code", memberController.deleteMember);

router.post("/:memberId/borrow/:bookId", memberController.borrowBook);
router.post("/:memberId/return/:bookId", memberController.returnBook);

module.exports = router;
