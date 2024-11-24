const mongoose = require('mongoose');

const connectDb = async () => {
    const conn = await mongoose.connect('mongodb+srv://ayahamadani:DVl0Y0aiBZ9LtC02@cluster0.w2p7y.mongodb.net/');
}