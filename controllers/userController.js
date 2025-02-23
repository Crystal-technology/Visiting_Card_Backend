const User = require("../models/UserRecord");
const bcrypt = require('bcrypt');

const verifyUsers = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.status(404).json({ success: false, message: "User not Exist..." });
        }

        const correctPassword = await bcrypt.compare(password, existingUser.password);
        if (!correctPassword) {
            res.status(403).json({ success: false, message: "Password is wrong.." });
        }
        const users = await User.find();
        res.status(200).json({ message: "Login successfull", success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        res.status(201).json(userResponse);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating user" });
    }
};

module.exports = { verifyUsers, createUser };
