const nodemailer = require("nodemailer")
const { authenticate } = require("../models/user")
const pug = require("pug")
const { report, User, Property } = require("./schema")
const properties = require("../models/property");
const config = require("../config/config").config

const searchReport=async(data,postid)=>{
    const verifyReport=await report.findOne({$and:[{reportedBy:data},{postId:postid}]})
    return verifyReport 
}
const addReport = async (data, token) => {
    const user = await authenticate(token)
    const property = await Property.findOne({ _id: data.postId })
    const condition=property != null && property.postedBy.toString() != user._id.toString()
   // console.log(property)
    if (condition) {
        const reportVerification=await searchReport(user._id,data.postId)
        if(reportVerification){
            return "you already reported"
        }
        else{
        const reportData = {
            postId: data.postId,
            reason: data.reason,
            reportedBy: user._id
        }

        await new report(reportData).save()

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.user,
                pass: config.password
            }
        })
        const mailOptions = {
            from: "veeramaheshwaransiam@gmail.com",
            to: user.email,
            cc: "aswinkumar.baskar@siamcomputing.com",
            subject: "report property",
            html: pug.renderFile("c:\\sample project\\sample\\templates\\report.pug", { url: "http://localhost:3000/app/getproperty/"+data.postId,name:user.name,reason:data.reason})
             //html: `<a href="localhost:3000/app/getproperty/"> view property </a>`
        }

        await transporter.sendMail(mailOptions, (err, info) => {

            if (err) {
                console.log(err)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

        return "reported successfully"
    }
    }
    else {
        return "there is no such property available or you are the owner"
    }

}

const getreports = async () => {
    const post = await report.find();
    return post;
}

const getReportedPosts = async () => {
    const post = await report.find().populate("postId reportedBy", { password: 0, token: 0 });
    return post;
}

const getPosts = async (token) => {
    const reportedpost = [];
    const userid = await authenticate(token);
    let result = await properties.properties(userid._id)
    //console.log(result);
    const report = await getreports();
    //filter for finding reported posts to particular owner
    report.forEach(res => {
        result.filter(item => {
            if (item._id.toString() === res.postId.toString()) {
                reportedpost.push(item);
            }
        })
    })

    console.log(reportedpost.length);
    if (reportedpost.length == 0) {
        return "No Records Available";
    }
    else {
        return reportedpost;
    }
}
module.exports = { addReport, getReportedPosts, getPosts }