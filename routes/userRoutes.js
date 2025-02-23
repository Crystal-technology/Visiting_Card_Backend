const express = require("express");
const { verifyUsers, createUser } = require("../controllers/userController");

const router = express.Router();

router.post("/login", verifyUsers);
router.post("/signup", createUser);

module.exports = router;
