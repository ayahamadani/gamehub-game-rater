const { User } = require('../models/user');
const bcrypt = require('bcrypt');

// @desc Check User
// @route POST /index
// @acess POST Private
exports.checkUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }

        res.status(200).json({ success: true, message: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


// @desc Add User
// @route POST /index
// @acess POST Public
exports.addUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUsername = await User.findOne({ username });

        if (!username || !password) {
            return res.status(400).send({ message: 'All fields are required!' });
        }

        if (existingUsername) return res.status(400).send({ message: 'Username already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();

        res.status(201).send({ message: 'User added successfully!', user: newUser, success: true });
    } catch (error) {
        console.log('Generated hashed password:', hashedPassword);
        console.error(error);
        res.status(500).send({ message: 'Error saving data', error });
    }
}