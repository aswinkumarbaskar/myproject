const { data } = require("node-env-file");
const { Property } = require("./schema")
const { authenticate, getRoles } = require("./user")
const config = require("../config/config").config;
const createpropertyData = async (data, token) => {
    const res = await authenticate(token)
    console.log(res)
    const roles = await getRoles(res.roleId);
    //console.log(roles);
    if (roles.roleType == config.roles.type2) {
        if (roles) {
            if (res) {

                const propertyData = {
                    propertyTypeId: data.propertyTypeId,
                    categoryType: data.categoryType,
                    bhkType: data.bhkType,
                    totalFloor: data.totalFloor,
                    propertyAge: data.propertyAge,
                    builtUpArea: data.builtUpArea,
                    facing: data.facing,
                    expectedRent: data.expectedRent,
                    expectedDeposit: data.expectedDeposit,
                    monthlyMaintenance: data.monthlyMaintenance,
                    preferredTenants: data.preferredTenants,
                    furnishing: data.furnishing,
                    parking: data.parking,
                    discription: data.discription,
                    amenties: {
                        bathroom: data.amenties.bathroom,
                        balcony: data.amenties.balcony,
                        waterSupply: data.amenties.waterSupply,
                        availableAmenties: data.amenties.availableAmenties,
                        availability: data.amenties.availability,

                    },
                    images: data.images,
                    builder: 0,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    pinCode: data.pinCode,
                    postedBy: res._id
                }

                await new Property(propertyData).save()
                return "property inserted successfully"
            }
        }
    } else {
        return "Unable to post in properties"
    }
}


const postBuilders = async (data, token) => {
    const res = await authenticate(token);
    const roles = await getRoles(res.roleId);
    console.log(roles);
    if (roles) {
        console.log(roles.roleType);
        if (roles.roleType == config.roles.type3) {
            const property = await new Property({
                builderName: data.builderName,
                webUrl: data.webUrl,
                address: data.address,
                mobileNumber: data.mobileNumber,
                price: data.price,
                builder: 1,
                proprtyType: data.proprtyType,
                brochure: data.brochure,
                images: data.images,
                postedBy: res._id
            });
            property.save();
            return "post successfull";
        }
        else {
            return "Unable to post in Buider properties"
        }
    }
    else {
        return "Unable to post in Buider properties"
    }
}


const filterProperty = async (data, token) => {
    let result = await Property.find({ "builder": data.builder, isActive: 1 })

    if (data.city) {
        result = result.filter(item => item.city === data.city)
    }
    if (data.categoryType) {
        result = result.filter(item => item.categoryType === data.categoryType)
    }
    if (data.bhkType) {
        result = result.filter(item => item.bhkType === data.bhkType)  //[1]
    }
    console.log(data.start_price, data.end_price)
    if (data.end_price) {
        console.log(0 <= 1000000 >= 100000)
        result = result.filter(item => data.start_price <= item.expectedPrice && item.expectedPrice <= data.end_price)
    }
    return result

}
const getPropertyById = async (data) => {
    const property = await Property.findOne({ _id: data }).populate("postedBy", { password: 0, token: 0 });
    return property;
}
const deleteProperty = async (data, token) => {
    const property = await Property.findOneAndUpdate({ _id: data.id }, { isActive: 0 });
    return "property Removed"
}

const updateProperty = async (data) => {
    const propertyData = {
        propertyTypeId: data.propertyTypeId,
        categoryType: data.categoryType,
        bhkType: data.bhkType,
        totalFloor: data.totalFloor,
        propertyAge: data.propertyAge,
        builtUpArea: data.builtUpArea,
        facing: data.facing,
        expectedRent: data.expectedRent,
        expectedDeposit: data.expectedDeposit,
        monthlyMaintenance: data.monthlyMaintenance,
        preferredTenants: data.preferredTenants,
        furnishing: data.furnishing,
        parking: data.parking,
        discription: data.discription,
        amenties: {
            bathroom: data.amenties.bathroom,
            balcony: data.amenties.balcony,
            waterSupply: data.amenties.waterSupply,
            availableAmenties: data.amenties.availableAmenties,
            availability: data.amenties.availability,

        },
        images: data.images,
        builder: 0,
        address: data.address,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
    }

    const updateResult = await Property.findOneAndUpdate({ _id: data.id }, propertyData)
    return "property updated successfully"

}

const recentData = async () => {
    const newDate = new Date(new Date() - 10 * 60 * 60 * 24 * 1000);
    const property = await Property.find({ createdAt: { $gte: newDate } })
    return property;
}
const properties=async(data)=>
{
    const property=await Property.find({postedBy:data}).populate("postedBy",{password:0,token:0});
    return property;
}
module.exports = {
    createpropertyData,
    postBuilders,
    filterProperty,
    deleteProperty,
    getPropertyById,
    updateProperty,
    recentData,
    properties
}


