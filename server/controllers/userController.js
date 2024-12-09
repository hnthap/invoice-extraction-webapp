import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    console.log('Received request body:', req.body); 
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, 
            email, 
            password: hashedPassword
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, user: { name: user.name, email: user.email, creditBalance: user.creditBalance } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.userId

        const user = await userModel.findById(userId)
        res.json({success: true, credits: user.creditBalance, user: {name: user.name, email: user.email}})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, userCredits };