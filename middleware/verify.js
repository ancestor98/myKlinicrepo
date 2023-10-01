const jwt= require("jsonwebtoken")
const dotenv=require("dotenv").config()
verifi=async(token)=>{
    try{
    const data= jwt.verify(token,process.env.MYTOKEN)
        return data;
    }catch(error){
        throw new Error("invalid link")
    }
}
module.exports=verifi