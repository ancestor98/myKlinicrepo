const nodemailer= require("nodemailer")
require("dotenv").config()
const mailsender=async(options)=>{
 const transporter=nodemailer.createTransport({
    service:process.env.service,
    auth:{
        user:process.env.user,
        pass:process.env.gmailpassword,
        secure:false

    }

 })
 const mailoption={
    from:process.env.user,
    to:options.email,
    subject:options.subject,
    text:options.message

}
await transporter.sendMail(mailoption)
}
module.exports=mailsender