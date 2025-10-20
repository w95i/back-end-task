const express = require("express");
const router = express.Router();
const {
  getAvailableStockByPlanId,
  getStockSummary
} = require("../controllers/stock.controller");

router.get("/:planId/available", (req, res) => {
  const planId = parseInt(req.params.planId);
  const availableStock = getAvailableStockByPlanId(planId);
  if (availableStock.message === "No available stock for this plan") {
    return res.status(404).json(availableStock.message);
  }
  return res.json(availableStock);
});

router.get("/summary", (req, res) => {
  const result = getStockSummary();
  if (result.message === "No stock data available") {
    return res.status(404).json(result.message);
  }
  return res.status(200).json(result);
});

module.exports = router;