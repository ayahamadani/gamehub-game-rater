const { Game } = require('../models/games');

// @desc Get all games
// @route GET /api/games
// @access Public
exports.getGames = async (req, res) => {
    try {
        const search = req.query.search;

        // Build the query object
        const query = !!search && search !== "undefined" ? { title: { $regex: search, $options: "i" } } : {};

        const games = await Game.find(query);

        res.status(200).json({
            success: true,
            data: games
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch games"
        });
    }

};

// @desc Get a single game
// @route GET /api/games/:id
// @access Public
exports.getGame = async (req, res) => {
    const games = await Game.find();
    const gameId = req.params.id;
    const game = games.find(g => g.title.toLowerCase().replace(/\s+/g, '-') === gameId.toLowerCase());

    if (game) {
        res.status(200).json({ success: true, data: game });
    } else {
        res.status(404).json({ success: false, message: "Game not found" });
    }
}
