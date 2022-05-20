const { createpropertyData, postBuilders, filterProperty, deleteProperty, getPropertyById, recentData } = require("../models/property")
const { validateToken } = require("../sub_modules/tokenGenaration")
const addProperty = async (req, res) => {
    try {
        const result = await createpropertyData(req.body, req.headers["x-access-token"])
        res.status(201).json({ message: result })
        return result

    }
    catch (err) {
        res.status(400).json({ "Error": "" + err })
    }
}

const postBuilder = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const user = await postBuilders(req.body, token);
        res.status(200).json({ status: 1, Details: user });

    } catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}

const getProperties = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const filterResult = await filterProperty(req.body, token)
        res.status(200).json({ data: filterResult })

    }
    catch (err) {
        res.status(400).json({ "ERROR": "" + err })

    }
}
const removeProperty = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const property = await deleteProperty(req.body, token);
        res.status(200).json({ status: 1, Details: property });
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const getParticularProperty = async (req, res) => {
    try {

        const property = await getPropertyById(req.body.id);
        res.status(200).json({ status: 1, Details: property });
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const updatePropertyDetails = async (req, res) => {
    try {
        const result = await updateProperty(req.body)
        res.status(200).json({ result })

    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });

    }

}
const getsingleProperty = async (req, res) => {
    try {
        const property = await getPropertyById(req.params.postid);
        res.status(200).json({ status: 1, Details: property });
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const recentPost = async (req, res) => {
    try {
        const property = await recentData();
        res.status(200).json({ status: 1, Details: property });
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
module.exports = {
    addProperty,
    postBuilder,
    getProperties,
    removeProperty,
    getParticularProperty,
    updatePropertyDetails,
    getsingleProperty,
    recentPost
};
