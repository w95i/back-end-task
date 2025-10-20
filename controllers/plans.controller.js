const plans = require("../db/plans.json");

const getAllPlans = () => {
  const allPlans = plans;
  if (!allPlans || allPlans.length === 0) {
    return { message: "No plans available" };
  }
  return allPlans;
};

const getPlanById = (id) => {
  const plan = plans.find((plan) => plan.id === id) || null;
  if (!plan) {
    return { message: "Plan not found" };
  }
  return plan;
};

const getPlanBySearch = (searchTerm) => {
    const matchedPlans = plans.filter((plan) =>
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedPlans.length === 0) {
      return { message: "No plans found" };
    }
    return matchedPlans;
};

module.exports = { getAllPlans, getPlanById, getPlanBySearch };
