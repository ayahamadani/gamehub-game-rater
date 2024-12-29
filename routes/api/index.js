const apiRouter = require('express').Router();
const gameRouter = require("./games")

apiRouter.get("/", (req, res) => {
    res.status(400).send({ success: true, message: "You are using Aya's api :3" })
})
apiRouter.use("/games", gameRouter)

module.exports = apiRouter