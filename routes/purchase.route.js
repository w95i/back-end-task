const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { purchase } = require("../controllers/purchase.controller");

router.post("/", authenticateToken, (req, res) => {
  const { planId } = req.body;
  const userId = req.user.id;
  const result = purchase(planId, userId);
  if (result.message) {
    return res.status(400).json(result.message);
  }
  return res.json(result);
});

module.exports = router;