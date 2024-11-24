const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    url: { type: String },
    releaseDate: { type: Date },
    genre: { type: String },
    description: { type: String },
    rating: { type: Number },
    developer: { type: String }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Game = mongoose.model('Game', gameSchema);
const User = mongoose.model('User', userSchema);

exports.Game = Game;
exports.User = User;

