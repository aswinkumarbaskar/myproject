const express = require("express");
const apiController = require("../controller/user.controller");
const { validation, allValidation } = require("../validations/validation");
const { authenticate, adminAuthenticate } = require("../middlewares/authenticate");
const {
    signupSchema,
    admin,
    validateId,
    loginSchema,
    builderSchema,
    postValidation,
    switchUserSchema,
    updatePropertyValidation,
    forgotPasswordSchema,
    reportValidation,
    testSchema
} = require("../validations/schema");

const propertyController = require("../controller/propertyController");
const adminContrller = require("../controller/adminController");
const reportController = require("../controller/reportController");
const { route } = require("express/lib/application");
const { authenticateAdmin } = require("../models/admin");
const router = express.Router();

//route for Signup

router.post("/signup", allValidation(signupSchema), apiController.signUp);

//route for login

router.post("/login", validation(loginSchema), apiController.login);
//router for addproperty
router.post("/addProperty", authenticate, validation(postValidation), propertyController.addProperty)

//router for post by builders
router.post("/addBuilderProperty", authenticate, validation(builderSchema), propertyController.postBuilder);
//route for switch users....
router.post("/switchuser", authenticate, validation(switchUserSchema), apiController.switchUser);

router.post("/getOwnerDeatils", authenticate, apiController.getOwnerDeatils);

//filter property
router.post("/getProperties", authenticate, propertyController.getProperties)
//route for logout
router.post("/logout", authenticate, apiController.logout)

//update property
router.put("/updateproperty", authenticate, validation(updatePropertyValidation), propertyController.updatePropertyDetails)

//route for delete property
router.delete("/deleteproperty", authenticate, validation(validateId), propertyController.removeProperty);
//router for get all users
router.get("/getallusers", adminAuthenticate, adminContrller.getUsers);
//route for particular Property
router.post("/getproperty", authenticate, propertyController.getParticularProperty);
//route for forgot password
router.post("/forgotpassword", validation(forgotPasswordSchema), apiController.forgotPassword);
//route for admoin login
router.post("/adminlogin", validation(admin), adminContrller.login);
//route for report a property
router.post("/reportProperty", authenticate, validation(reportValidation), reportController.createReport)
//route for posted property by user
router.get("/getallpropertywithuser", adminAuthenticate, adminContrller.getAllProperties);
//route for getting particular users
router.post("/getparticularUser", adminAuthenticate, validation(validateId), adminContrller.getSingleUser);
//route for get group of post by user
router.post("/getgroupposts", adminAuthenticate, validation(validateId), adminContrller.groupPosts);
//route for particular property with params
router.get("/getproperty/:postid", propertyController.getsingleProperty);
//route for recentlt posted property
router.get("/recentposts", propertyController.recentPost);
//router for reported posts
router.get("/allreportedposts", adminAuthenticate, reportController.getReport);
//router for fetching reported posts to owner
router.get("/getreportedposts", authenticate, reportController.reportedPoststoOwner);
//router for remove user
router.post("/removeUser", adminAuthenticate, validation(validateId), adminContrller.removeUser);
//route for params testing
router.post("/test/:slno", allValidation(testSchema), (req, res) => {
    res.status(200).json({ status: 1, Message: "Successfull" });
})
module.exports = { router }; 