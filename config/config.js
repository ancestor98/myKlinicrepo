//const dotenv= require("dotenv").config()
require("dotenv").config()
const mongoose= require("mongoose")
const Url="mongodb://localhost:27017/KlinicDB"
 
"mongodb+srv://judahanaeto:XcRlCRGF7CyNNKlf@cluster0.gcemzgn.mongodb.net/"
//"mongodb://localhost/klinicDB"
//"mongodb://localhost/ClinicDB"
  
mongoose.connect(Url).then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log(error.message)
})