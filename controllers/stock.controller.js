const plans = require("../db/plans.json");
const stock = require("../db/stock.json");

const getAvailableStockByPlanId = (planId) => {
  const availableStock = stock.filter(
    (item) => item.planId === planId && item.status === "ready"
  );
  if (availableStock.length === 0) {
    return { message: "No available stock for this plan" };
  }
  return availableStock;
};

const getStockSummary = () => {
  const summary = {};
  plans.forEach((plan) => {
    summary[plan.title] = { planId: plan.id, ready: 0, sold: 0, error: 0 };
  });

  stock.forEach((item) => {
    if (summary[item.planId]) {
      summary[item.planId][item.status] += 1;
    }
  });

  if (summary.length === 0) {
    return { message: "No stock data available" };
  }

  return summary;
};

module.exports = { getStockSummary, getAvailableStockByPlanId };
