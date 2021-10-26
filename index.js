const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
app.get("/",function(req,res){
res.send("welcome to my page");
});

app.get("/login",function(req,res){
	res.send("your are logged in..!!!")
});
app.listen(port,function(){
	console.log("server running..!!!");
})