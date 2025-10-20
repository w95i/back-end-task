const users = require("../db/users.json");
const jwt = require("jsonwebtoken");

const login = (phone, password) => {
  const user = users.find((u) => u.phone === phone);
  if (user === undefined) {
    return "User Not Found";
  } else {
    if (user.password === password) {
      const token = jwt.sign(
        { id: user.id, name: user.name, phone: user.phone },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return { token };
    } else{
      return "Wrong Password";
    }
  }
};

const getUserInfo = (id) => {
  const user = users.find((u) => u.id === id);
  if (user) {
    return { id: user.id, name: user.name, phone: user.phone, balance: user.balance };
  } else {
    return null;
  }
};

module.exports = { login, getUserInfo };
