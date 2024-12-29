const rootRouter = require("express").Router();
const apiRouter = require("./api/index.js");
const authRouter = require("./auth.js");
const pageRouter = require("./pages")

rootRouter.use("/", pageRouter)
rootRouter.use("/api", apiRouter)
rootRouter.use("/auth", authRouter);

module.exports = rootRouter
