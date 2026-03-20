const express = require("express");
const router = express.Router();
const { getAiRecommendations } = require("../controllers/ai.controller");

router.post("/recommend", getAiRecommendations);

module.exports = router;
