const plans = require("../db/plans.json");
const users = require("../db/users.json");
const stock = require("../db/stock.json");
const { getPlanById } = require("./plans.controller");
const { getUserInfo } = require("./users.controller");

const purchase = (planId, userId) => {
  //STEP 1: check if plan exists
  const plan = getPlanById(planId);
  if (!plan) {
    return { message: "Plan not found" };
  }

  //STEP 2: check if user has enough balance
  const user = getUserInfo(userId);
  if (!user || user.balance < plan.price) {
    return { message: "Insufficient balance" };
  }

  //Step 3: find one stock item with status='ready' for this planId
  const stockItem = stock.find(
    (item) => item.planId === planId && item.status === "ready"
  );
  if (!stockItem) {
    return { message: "No available stock" };
  }

  //Step 4: return { plan, code }
  return { plan, code: stockItem.code };
};

module.exports = { purchase };
