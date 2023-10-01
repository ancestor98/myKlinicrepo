const mongoose= require("mongoose")

 const patientschema= new mongoose.Schema({
    name:{
        type:String,
    },address:{
        type:String,
     },bloodgroup:{
        type:String,
    },email:{
        type:String,
    },medicalhistory:{
        type:String,
    },pictures:{
        type:String,
    },password:{
        type:String,
    },token:{
        type:String,
    },number:{
        type:Number,
    IsVerified:{
    type:Boolean,
    default:false
    },Scheldued:{
        type:Boolean,
    },isPaid:{
        type:Boolean,
    },link:[{
        type:mongoose.Schema.Types.ObjectId
    }]

}})
const patientmodel= mongoose.model("patient",patientschema)

 module.exports=patientmodel