const { login, getUserInfo } = require("../controllers/users.controller");
const { authenticateToken } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { phone, password } = req.body;
  const response = login(phone, password);
  if (response === "User Not Found") {
    return res.status(401).json({ message: response });
  } else if (response === "Wrong Password") {
    return res.status(401).json({ message: response });
  } else {
    return res.status(200).json(response);
  }
});

router.get("/me", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userInfo = getUserInfo(userId);
  if (userInfo) {
    return res.status(200).json(userInfo);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;