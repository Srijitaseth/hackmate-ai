const express = require("express");
const router = express.Router();
const { getMatches } = require("../controllers/matches.controller");

router.get("/:userId", getMatches);

module.exports = router;
