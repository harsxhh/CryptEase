import User from '../modals/User.modal.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;
        if (!username || !fullname || !email || !password) {
            return res.status(400).json({
                status: 'false',
                message: 'Please fill all fields'
            })
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                status: "false",
                message: "User already exists"
            })
        }
        console.log(req.body)
        const passwordHash = await bcrypt.hash(password, 12);
        console.log(passwordHash)
        const user = new User({
            userName: username,
            fullName: fullname,
            email,
            password: passwordHash
        })
        console.log(user);
        await user.save();
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully'
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'false',
            message: err.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        console.log(req.body)
        if (!usernameOrEmail || !password) {
            throw new Error('Please fill all fields')
        }
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        console.log(user)
        if (!user) {
            return res.status(400).json({
                status: 'false',
                message: 'User do not exist'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'false',
                message: 'Invalid Credentials'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '72h' });
        console.log(token)
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'false',
            message: err.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.find({ _id: id });
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'false',
            message: err.message
        })
    }
}

export const SendUPIMoney = async (req, res) => {
    try {
        const { amount} = req.body;
        const userId=req.user.id;
        const crypto = parseInt(amount);
        const user = await User.findOne({ _id: userId });
        if (user) {
            user.wallet += crypto;
            await user.save();
            res.status(200).send({ message: "Transaction Successful" });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    }
    catch(err) {
        res.status(400).json({
            status: 'false',
            message: err.message
        })
    }
}