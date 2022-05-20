const joi = require("joi");

const signupSchema = joi.object({

    body: joi.object({
        name: joi.string().trim().required(),
        phoneNumber: joi.string().regex(/^[0-9]+$/).length(10).required(),
        email: joi.string().trim().required(),
        password: joi.string().trim().required(),
        roleId: joi.array().required(),
        countryCode: joi.number().required(),
        country: joi.string().trim().required(),
        state: joi.string().trim().required(),
        city: joi.string().trim().required(),
        pinCode: joi.string().trim().regex(/^[0-9]+$/).length(6).required()
    }),
    params:joi.object().optional(),
    query:joi.object().optional()
})
const loginSchema = joi.object({
    phoneNumber: joi.string().regex(/^[0-9]+$/).length(10).trim().required(),
    password: joi.string().trim().required(),

})

const postValidation = joi.object({
    propertyTypeId: joi.string(),
    categoryType: joi.string(),
    //ownerShipType:joi.string(),
    //salePropertyType:joi.string(),
    /// apartmentType:joi.string(),
    bhkType: joi.string(),
    totalFloor: joi.number(),
    propertyAge: joi.string(),
    builtUpArea: joi.number(),
    facing: joi.string(),
    expectedPrice: joi.number().allow(null),
    expectedRent: joi.number().allow(null),
    expectedDeposit: joi.number().allow(null),
    monthlyMaintenance: joi.string(),
    preferredTenants: joi.string(),
    furnishing: joi.string(),
    parking: joi.string(),
    discription: joi.string(),
    amenties: {
        bathroom: joi.number(),
        balcony: joi.number(),
        waterSupply: joi.string(),
        availableAmenties: joi.array(),
        availability: joi.string(),
    },
    images: joi.array(),
    address: joi.string().required(),
    city: joi.string(),
    state: joi.string(),
    pinCode: joi.number(),
    postedBy: joi.string()
})

const builderSchema = joi.object({
    builderName: joi.string().trim().required(),
    webUrl: joi.string().trim().required(),
    address: joi.string().trim().required(),
    mobileNumber: joi.string().regex(/^[0-9]+$/).length(10).required(),
    price: joi.string().trim().required(),
    proprtyType: joi.string().trim().required(),
    brochure: joi.string().trim().required(),
    images: joi.array(),
});

const switchUserSchema = joi.object({ roleId: joi.string().trim().required() })

const updatePropertyValidation = joi.object({
    id: joi.string().required(),
    propertyTypeId: joi.string(),
    categoryType: joi.string(),
    //ownerShipType:joi.string(),
    //salePropertyType:joi.string(),
    /// apartmentType:joi.string(),
    bhkType: joi.string(),
    totalFloor: joi.number(),
    propertyAge: joi.string(),
    builtUpArea: joi.number(),
    facing: joi.string(),
    expectedPrice: joi.number().allow(null),
    expectedRent: joi.number().allow(null),
    expectedDeposit: joi.number().allow(null),
    monthlyMaintenance: joi.string(),
    preferredTenants: joi.string(),
    furnishing: joi.string(),
    parking: joi.string(),
    discription: joi.string(),
    amenties: {
        bathroom: joi.number(),
        balcony: joi.number(),
        waterSupply: joi.string(),
        availableAmenties: joi.array(),
        availability: joi.string(),
    },
    images: joi.array(),
    address: joi.string().required(),
    city: joi.string(),
    state: joi.string(),
    pinCode: joi.number()
})
const forgotPasswordSchema = joi.object({
    phoneNumber: joi.string().regex(/^[0-9]+$/).length(10).required(),
    changePassword: joi.string().trim().required(),
});

const reportValidation = joi.object({
    postId: joi.string().required(),
    reason: joi.string().required(),
})
const admin = joi.object({
    email: joi.string().required(),
    password: joi.string().trim().required(),

});
const validateId = joi.object({
    id: joi.string().required()
});
const testSchema = joi.object({
    body:{
        name: joi.string().required(),
        password: joi.string().required(),},
    params:joi.object({slno: joi.number().required()}),
    query:joi.object({username: joi.string().required()})

}).unknown(true);
const testSchema2=joi.object({
    name:joi.string().required(),
    password:joi.string().required(),
    username:joi.string().required(),
    slno:joi.number().optional(),
    pinCode:joi.string().required(),
    address:joi.string().required(),
    city:joi.string().required(),
    countryCode:joi.string().required(),
    place:joi.string().required(),
    landmark:joi.string().required(),
    options:joi.string().required(),
    confirmPassword:joi.string().required(),


})
module.exports = {
    signupSchema,
    loginSchema,
    postValidation,
    builderSchema,
    switchUserSchema,
    updatePropertyValidation,
    forgotPasswordSchema,
    reportValidation,
    admin, validateId,
    testSchema
};
