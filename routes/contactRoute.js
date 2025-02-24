const express = require("express");
const { contactForm } = require("../controllers/contactController");

const router = express.Router();

router.post("/email", contactForm);

module.exports = router;
