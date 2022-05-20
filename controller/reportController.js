const { addReport, getReportedPosts, getPosts } = require("../models/report")

const createReport = async (req, res) => {
    try {
        const result = await addReport(req.body, req.headers["x-access-token"])
        res.status(201).json({ message: result })
        return result

    }
    catch (err) {
        res.status(400).json({ "Error": "" + err })
    }

}
const getReport = async (req, res) => {
    try {
        const result = await getReportedPosts();
        res.status(200).json({ status: 1, Details: result });
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
const reportedPoststoOwner = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const result = await getPosts(token);
        res.status(200).json({ status: 1, Details: result });
    }
    catch (err) {
        res.status(400).json({ status: 0, Message: "Error Occured", Error: " " + err });
    }
}
module.exports = { createReport, getReport, reportedPoststoOwner }