const { User, Game } = require('../models/games');
const express = require('express');
const app = express();

// Middleware to parse incoming JSON bodies
app.use(express.json());

// @desc Get all games
// @route GET /api/games
// @access Public
exports.getGames = async (req, res) => {
    try {
        const games = await Game.find();
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

// @desc Check User
// @route POST /index
// @acess POST Private
exports.checkUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }

        res.status(200).json({ success: true, message: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error'});
    }
}


// @desc Add User
// @route POST /index
// @acess POST Public
exports.addUser = async (req, res) => {
    try {
        const { username, password} = req.body;
        const existingUsername = await User.findOne({ username });

        if (!username || !password) {
            return res.status(400).send({ message: 'All fields are required!' });
        }

       if(existingUsername) return res.status(400).send({ message: 'Username already exists'});

        const newUser = new User({ username, password });

        await newUser.save();

        res.status(201).send({ message: 'User added successfully!', user: newUser});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error saving data', error});
    }
}