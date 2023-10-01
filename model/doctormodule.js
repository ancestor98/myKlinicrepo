
const mongoose= require("mongoose")


 const doctorschema= new mongoose.Schema({
    doctorsName:{
        type: String,
        required: [true, 'doctorsName:is Required']

    },addrress:{
        type: String,
        required: [true, 'addrress is Required']

    },shift:{
        type: String,
        required: [true, 'shift is Required']
    
    },regNo:{
        type: String,
        required: [true, 'Password is Required']

    },picture:{
        type: String,
        required: [true, 'picture is Required']

    },number:{
        type: String,
        required: [true, 'number is Required']
    },password:{
        type:String,
        required: [true, 'password is Required']

    },token:{
    type:String,

    },islogin:{
        type:Boolean,
        default:false

    },isverified:{
        type:Boolean,
        default:false

    },Apointment:{
        type:Boolean,
        default:false

    },patient:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    }]
},{timestamp:true})
const doctorsModel= mongoose.model("doctor",doctorschema)


module.exports=doctorsModel