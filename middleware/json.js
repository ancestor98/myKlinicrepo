const jwt= require("jsonwebtoken")
const dotenv=require("dotenv").config()
gentoken=async(user,duration)=>{
    const expire= parseInt(duration)
   const TOKEN= jwt.sign({
        name:user.name,
        email:user.email
    },process.env.MYTOKEN,{expiresIn:expire})
    return TOKEN

}

verify=async(token)=>{
    try{
    const data= jwt.verify(token,process.env.MYTOKEN)
        return data;
    }catch(error){
        throw new Error("invalid link")
    }
}
module.export={gentoken,verify}