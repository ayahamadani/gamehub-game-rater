const pageRouter = require("express").Router();
const path = require('path');
const fs = require("fs");
const { Game } = require("../../models/games");


pageRouter.get("/", (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
})

pageRouter.get('/home', (req, res) => {
    res.sendFile(path.resolve('public', 'home.html'));
});

pageRouter.get('/game/:gamename', async (req, res) => {
    const gamename = req.params.gamename;

    const game = await Game.findOne({
        title: {
            $regex: new RegExp("^" + gamename.toLowerCase().replaceAll("-", " "), "i")
        }
    });

    if (!game) {
        return res.sendFile(path.resolve("public", "game-404.html"))
    }

    const filePath = path.resolve("public", "game.html");
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
            return;
        }

        // Inject the script into the file
        const modifiedContent = data.replace(
            '<head>',
            `<head>
            <script type="application/json" id="gameslug">${JSON.stringify({ ...game?._doc })}</script>
            `
        );

        // Send the modified content
        res.send(modifiedContent);
    });
});

module.exports = pageRouter;