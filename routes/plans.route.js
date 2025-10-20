const { getAllPlans, getPlanById, getPlanBySearch } = require("../controllers/plans.controller");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const plans = getAllPlans();
  if (plans.message === "No plans available") {
    return res.status(404).json(plans.message);
  }
  return res.status(200).json(plans);
});

router.get("/search", (req, res) => {
  const searchTerm = req.query.q;
  const plans = getPlanBySearch(searchTerm);
  if (plans.message === "No plans found") {
    return res.status(404).json(plans.message);
  }
  return res.status(200).json(plans);
});

router.get("/:id", (req, res) => {
  const planId = parseInt(req.params.id);
  const plan = getPlanById(planId);
  if (plan.message === "Plan not found") {
    return res.status(404).json(plan.message);
  }
  return res.status(200).json(plan);
});

module.exports = router;
