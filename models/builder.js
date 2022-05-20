const { builderModel } = require("../models/schema");
const { authenticate,getRoles} = require("../models/user");


const postBuilders = async (data, token) => {
    const res = await authenticate(token);
    const roles=await getRoles(res.roleId);
    console.log(roles);
    if(roles)
    {
        console.log(roles.roleType);
        if(roles.roleType==3)
        {
            const property = await new builderModel({
                builderName: data.builderName,
                webUrl: data.webUrl,
                address: data.address,
                mobileNumber: data.mobileNumber,
                price: data.price,
                proprtyType: data.proprtyType,
                brochure: data.brochure,
                images: data.images,
                postedBy: res._id
            });
            property.save();
            return "post successfull";
        }
        else
        {
            return "Unable to post in Buider properties"    
        }
    }
    else
    {
        return "Unable to post in Buider properties"
    }
    

}

module.exports = { postBuilders };