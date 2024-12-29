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
const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;

