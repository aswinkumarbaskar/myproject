const { User, Roles, Property } = require("./schema");
const { encryptPassword, decryptPassword } = require("../sub_modules/bcrypt");
const { generateToken } = require("../sub_modules/tokenGenaration");

const singleUserData = async (data) => {
    const user = await User.findOne({ phoneNumber: data, isActive: 1 });
    return user;
}

const updateToken = async (data, token) => {

    const updatetoken = await User.findOneAndUpdate({ _id: data }, { token: token });
    return updatetoken;
    // console.log(updateToken);
}
const signUp = async (data) => {


    const password = await encryptPassword(data.password);
    const singleUser = await singleUserData(data.phoneNumber);
    if (singleUser) {
        return "Mobile Number Already exists"
    }
    else {
        const user = new User({
            name: data.name,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: password,
            roleId: data.roleId,
            countryCode: data.countryCode,
            country: data.country,
            state: data.state,
            city: data.city,
            pinCode: data.pinCode
        });

        const dataValue = await user.save()
        if (dataValue) {
            console.log(dataValue)
            const token = generateToken(dataValue._id.toString());
            await updateToken(dataValue._id, token);
            const obj = { Message: "Signup Successfull", token: token, "data": dataValue };
            return obj;
        }
    }
}

const login = async (data) => {
    const singleUser = await singleUserData(data.phoneNumber);
    if (singleUser) {
        const decrypt = await decryptPassword(data.password, singleUser.password);
        if (decrypt === false) {
            return "Invalid Password"
        } else {
            /* generate Token */
            const token = generateToken(singleUser._id.toString());
            /* update Token */
            await updateToken(singleUser._id, token);
            const finduser = await User.findOne({ "phoneNumber": data.phoneNumber }).select({ password: 0 }).populate("roleId")
            const obj = { Message: "Login Successfull", token: token, user_id: singleUser._id, user: finduser };
            return obj;
        }
        //return " Unable to login Invalid username"
    } else {
        return "Unable to login invalid Username"
    }
}

const getRoles = async (data) => {
    const roles = await Roles.findOne({ _id: data });
    return roles;
}
const authenticate = async (data) => {
    const user = await User.findOne({ token: data });
    return user;
}
const switchRole = async (userId, newId) => {
    const user = await User.findOneAndUpdate({ _id: userId }, { roleId: newId.roleId });
    console.log(user)
    return "User Switched to" + newId;
}
const switchuser = async (data, token) => {
    const user = await authenticate(token);
    console.log(user);
    if (user) {
        const roles = await switchRole(user._id, data);
        return await authenticate(token)
    }
}

const getOwnerDeatils = async (data, token) => {
    var unirest = require("unirest");
    const user = await authenticate(token);
    console.log(user)
    if (user) {
        const propertydata = await Property.findOne({ _id: data.propertyId })
        console.log(propertydata)
        if (propertydata) {
            const postuser = await User.findOne({ _id: propertydata.postedBy.toString() })

            if (postuser && propertydata) {
                console.log(propertydata)
                var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
                req.headers({
                    "authorization": "Y8hvg1CnsQXK7L3V4DMpJI2aHmB9SeukNOqwt6WZPGrzo5ljTyO4Bm621uMaFPjCtXY9SwyVoQcKdesI"
                });
                let message = "Hi " + user.name + ", Call " + postuser.name + "(seller) at " + postuser.phoneNumber + " for a brokerage free in " + propertydata.city
                console.log(message)
                req.form({
                    "message": message,
                    "language": "english",
                    "route": "q",
                    "numbers": user.phoneNumber,
                });

                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                    console.log(res.body);
                });
                return "SMS sent successfully"
            }
        }
    }
}

const logout = async (data, token) => {
    const user = await authenticate(token);
    console.log(user);
    if (user) {
        await User.findOneAndUpdate({ _id: user._id }, { token: '' });
        return "logout Successfully"
    }
}
const forgot_password = async (data, token) => {
    const user = await singleUserData(data.phoneNumber);
    if (user) {
        const password = await encryptPassword(data.changePassword);
        const updatepassword = await User.findOneAndUpdate({ _id: user._id }, { password: password });
        return "Password Successfully Changed";
    }
    else {
        return "Invalid Mobile Number";
    }
}
module.exports = {
    signUp,
    login,
    authenticate,
    getRoles,
    switchuser,
    getOwnerDeatils,
    logout,
    forgot_password,
}