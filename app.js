const express = require("express");
const config = require("./config/config").config;
const dbConnect = require("./sub_modules/database");
const { router } = require("./routes/user");
const app = express();
app.use(express.json());
app.use("/app", router);

app.listen(config.port, () => {
    dbConnect()
    console.log("Server Running..." + config.port + "!!!");
});
module.exports=app;