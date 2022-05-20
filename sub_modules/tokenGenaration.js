const jwt = require("jsonwebtoken");
const config = require("../config/config").config;

//console.log(a.secretKey);

const generateToken = (data) => {
    const token = jwt.sign({token:data}, config.secretKey,{expiresIn:'2h'});
    return token
    //console.log(token)
}

const validateToken=(data)=>{
    const token=jwt.verify(data,config.secretKey);
    return token;
}
module.exports = { generateToken,validateToken };