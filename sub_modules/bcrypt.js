const bcrypt = require("bcrypt");

const salt = 12;

const encryptPassword = async (data) => {
    const password = await bcrypt.hash(data, salt);
    return password;

}

const decryptPassword = async (data, pass) => {
    const password = await bcrypt.compare(data, pass);
    return password;
}


module.exports = { encryptPassword, decryptPassword }