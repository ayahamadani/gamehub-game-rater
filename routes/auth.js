const authRouter = require("express").Router();
const { addUser, checkUser } = require("../controllers/auth");

authRouter.post("/login", checkUser)
authRouter.post("/register", addUser)

module.exports = authRouter;