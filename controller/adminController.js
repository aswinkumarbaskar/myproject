const User = require("../models/admin");
const Admin = require("../models/admin");
const getUsers = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const user = await User.getUsers(token);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}

const login = async (req, res) => {
    try {
        const user = await Admin.adminLogin(req.body);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const getAllProperties = async (req, res) => {
    try {
        const user = await Admin.PropertyAssociatedUser();
        res.status(200).json({ status: 1, Details: user })
    } catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const getSingleUser = async (req, res) => {
    try {
        const user = await Admin.findsingleuser(req.body);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const groupPosts = async (req, res) => {
    try {
        const user = await Admin.groupPosts(req.body);
        res.status(200).json({ status: 1, Details: user })
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const removeUser=async(req,res)=>
{
    try
    {
        const user = await Admin.removeUser(req.body);
        res.status(200).json({ status: 1, Details: user })
    }
    catch(err)
    {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
module.exports = {
    getUsers,
    login,
    getAllProperties,
    getSingleUser,
    groupPosts,
    removeUser
};