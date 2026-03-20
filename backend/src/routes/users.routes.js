const express = require("express");
const router = express.Router();
const {
  createOrUpdateUser,
  getUser,
} = require("../controllers/users.controller");

router.post("/profile", createOrUpdateUser);
router.get("/profile/:userId", getUser);

module.exports = router;
