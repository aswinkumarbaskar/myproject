const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/admin");
const config = require("../config/config").config;
const authenticate = async (req, res, next) => {
    if (req.headers['x-access-token']) {
        const user = await User.authenticate(req.headers['x-access-token']);
        if (user) {

            jwt.verify(req.headers['x-access-token'], config.secretKey, (err, decode) => {
                if (err) throw res.status(401).json({ status: 0, Message: "Unauthorized Access" })
                next();
            });
        }
        else {
            res.status(420).json({ status: 0, Message: "Invalid Token" })
        }
    } else {
        res.status(422).json({ status: 0, Message: "No Token provide" })
    }

}

const adminAuthenticate = async (req, res, next) => {
    if (req.headers['x-access-token']) {
        const user = await Admin.authenticateAdmin(req.headers['x-access-token']);
        if (user) {

            jwt.verify(req.headers['x-access-token'], config.secretKey, (err, decode) => {
                if (err) throw res.status(401).json({ status: 0, Message: "Unauthorized Access" })
                next();
            });
        }
        else {
            res.status(420).json({ status: 0, Message: "Invalid Token" })
        }
    } else {
        res.status(422).json({ status: 0, Message: "No Token provide" })
    }
}
module.exports = { authenticate, adminAuthenticate };