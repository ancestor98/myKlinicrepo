const express=require("express")
 const Router=express.Router()
 const {getone,getallpatient,singup,isVerified}=require("../controller/patient")
 Router.post("/singup",singup)
 Router.post("/singup",singup)

 Router.post("/isVerified/:id",isVerified)

 Router.get("/getallpatient",getallpatient)

 module.exports=Router