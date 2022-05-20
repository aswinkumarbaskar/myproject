const User = require("../models/user");

const signUp = async (req, res) => {
    try {
        let userDetails;
        const user = await User.signUp(req.body);
        res.status(201).json({ status: 1, Message: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.login(req.body);
        res.status(200).json({ status: 1, Details: user });
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}

const postBuilders = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const user = await Property.postBuilders(req.body, token);
        res.status(200).json({ status: 1, Details: user });

    } catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const switchUser = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const user = await User.switchuser(req.body, token);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}

const getOwnerDeatils = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const user = await User.getOwnerDeatils(req.body, token);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}


const logout = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const user = await User.logout(req.body, token);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const user = await User.forgot_password(req.body);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
module.exports = {
    signUp,
    login,
    switchUser,
    getOwnerDeatils,
    logout,
    forgotPassword
};