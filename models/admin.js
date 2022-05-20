const { User, admin, Property } = require("../models/schema");
const { encryptPassword, decryptPassword } = require("../sub_modules/bcrypt");
const { generateToken } = require("../sub_modules/tokenGenaration");
const config = require("../config/config").config;
const mongoose = require("mongoose");
/*
mongoose.connect("mongodb+srv://Aswinkumarbaskar:55726368@cluster0.w2hmv.mongodb.net/sampleDB?retryWrites=true&w=majority").then(result=>{
    console.log("db Conncted");
}).catch(err=>{
    console.log(err);
})

async function add ()
{       
    const password=await encryptPassword("password");
    //console.log(password);
    const user=await new admin({roleName:"Admin",mailId:"aswinkumar.baskar@siamcomputing.com",password:password,roleId:"624a9b9c36d85cb8e5c9441c"})
    user.save();
    console.log("data inserted in admoin tables")
}

setTimeout(add,5000);
*/
//function for get all users
const getUsers = async (token) => {

    const user = await authenticateAdmin(token);
    if (user) {

        if (user.roleId.roleType == config.roles.type4) {
            const users = await User.find({ isActive: 1 }).select({ password: 0, token: 0 }).populate("roleId");
            return users;
        }
        else {
            return "Unable to access this route"
        }
    }
    else {
        return "Unable to access this route"
    }

}

const getSingleUser = async (email) => {
    const user = await admin.findOne({ mailId: email, isActive: 1 });
    return user;
}
const updateToken = async (id, token) => {
    const updatetoken = await admin.findOneAndUpdate({ _id: id }, { token: token });
    return updatetoken;
}
const authenticateAdmin = async (data) => {
    const user = await admin.findOne({ token: data }).select({ password: 0, token: 0 }).populate("roleId");
    return user;
}
const adminLogin = async (data) => {
    const singleUser = await getSingleUser(data.email);
    if (singleUser) {
        const decrypt = await decryptPassword(data.password, singleUser.password);
        if (decrypt === false) {
            return "Invalid Password"
        } else {
            /* generate Token */
            const token = generateToken(singleUser._id.toString());
            /* update Token */
            await updateToken(singleUser._id, token);
            const finduser = await admin.findOne({ "phoneNumber": data.phoneNumber }).select({ password: 0 }).populate("roleId")
            const obj = { Message: "Login Successfull", user_id: singleUser._id, user: finduser };
            return obj;
        }
        //return " Unable to login Invalid username"
    } else {
        return "Unable to login invalid Username"
    }
}

const PropertyAssociatedUser = async () => {

    const property = await Property.find().populate("postedBy", { password: 0, token: 0 });
    //console.log(property.length);
    return property;
}

const findsingleuser = async (data) => {
    const user = await User.findOne({ _id: data.id }).select({ password: 0, token: 0 }).populate("roleId");
    if (user) {
        return user;
    }
    else {
        return "User not found";
    }

}
const groupPosts = async (data) => {
    const options = [{ $match: { _id: mongoose.Types.ObjectId(data.id) } }, {
        $lookup:
        {
            from: "properties",
            localField: "_id",
            foreignField: "postedBy",
            as: "posts"
        }
    }]
    const property = await User.aggregate(options);
    return property;
}
const removeUser=async(data)=>
{
    const user=await User.findOneAndUpdate({_id:data.id},{isActive:0});
    return "User Deactivated"
}
module.exports = {
    getUsers,
    adminLogin,
    authenticateAdmin,
    PropertyAssociatedUser,
    findsingleuser,
    groupPosts,
    removeUser
};