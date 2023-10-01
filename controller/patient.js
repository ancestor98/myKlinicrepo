const patientmodel=require("../model/patientmodel")
const cloudinary= require ("../middleware/cloudinary")
const bcrypts= require("bcrypt")
const genToken= require('../middleware/json')
const verifi=require("../middleware/verify")
const mailsender= require("../middleware/nodemailer")
const jwt= require("jsonwebtoken")

exports.singup= async(req,res)=>{
    try {
        
       
        const {name,address,bloodgroup,email,medicalhistory,password,number,}=req.body
        const user= await  patientmodel.findOne({email})
        if(user){
          return  res.status(401).json({
                message:"account already exist  go login"
            })
        }else{
    
         // now we handlepicture
       const image=req.files.pictures.tempFilePath
       console.log(req.files)
       const upload = await cloudinary.uploader.upload(image)
        // now we creat and harsh the  password
     const SaltedRound= await bcrypts.genSalt(10)
        const Harsh= await bcrypts.hash(password,SaltedRound)
        const Data={name,
            address,
            bloodgroup,
            email,
            medicalhistory,
            pictures:upload.secure_url,
            password:Harsh
            ,number
        }
        const patient= new patientmodel(Data)
        //await patient.save()
        // now we generate token
       // const Tokens= await genToken(patient,60*60)
       const Tokens= jwt.sign({
        name,
        email
       },process.env.MYTOKEN,{expiresIn:"1d"})
        patient.token=Tokens

        const subject=` you just singed up  to our hospital would you mind verifing you account you are welcome`
        const link=`${req.protocol}://${req.get("host")} /api/verify/ ${patient._id} /${Tokens}`
       const message=`would you mind using this ${link} to verify your account please`
        mailsender({
        email:patient.email,
       subject,
        message
       })
       await patient.save()
        res.status(200).json({
            message:"succesfully registerd",
            data:patient
        })
        //console.log(Token)
        }
    }catch(error) {
            res.status(500).json({
                message:error.message
            })
        }
    }
    
    exports.isVerified= async(req,res)=>{
        try {
            // first we would get the id
            // const registerdpatient= await patientmodel.findOne({email})
            // console.log(registerdpatient)
            // if(!registerdpatient){
            //     res.status(401).json({
            //         message:"you are not singed up yet"
            //     })
            // }else{
           let registerdpatient= await patientmodel.findById(req.params.id)
           if(registerdpatient == null){
            res.status(401).json({
                messsage:"no user found with id"
                
            })
           }else{
            const Token= registerdpatient.token
            
           const decode= await verifi(Token)
        const user= await patientmodel.findByIdAndUpdate(decode._id,{IsVerified:true},{new:true})
        console.log(user)
        //user.IsVerified=true
        const subject=`you have beeen scheldued for interview`
        const link=`${req.protocol}://${req.get("host")}/api/verify/${user._id}/${Token}`
       const message=`would you mind using this ${link} to verify your account please`
        mailsender({
        email:user.email,
       subject,
        message})
        await user.save()
        res.status(200).json({
            message:"account has been verified"
            
        })}
            
        } catch (error) {

            res.status(500).json({
                message:error.message

            })
            
        }
    }




exports.PatientSigningin= async(req,res)=>{
    try{
        const{email,password}=req.body
        const patient= await patientmodel.findOne({email})
        if(!patient){
            res.status(401).json({
                message:"you have not signed up yet"
            })
        }

    }catch(error){
        res.status(500).json({
            message:error.message
        })
        

    }
}

exports.getone= async(req,res)=>{
    try {
        const{patientId}=req.params.id 
        const patient=await patientmodel.findById(patientId)
        if(!patient){
           return res.status(404).json({
                message:"could not get the student you are looking for"

            })
        }else{res.status(200).json({
            message:"succesful",
            data:patient
        })}

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

exports.getallpatient= async(req,res)=>{
    try{
        const allpatientents= await patientmodel.find()
        if(allpatientents.length>0){
            res.status(200).json({
                message:"succesful",
               data:allpatientents

            }) }else{
                res.status(404).json({
                    message:"could not get all student"
                })
            }

    }catch(error){
          res.status(500).json({
        message:error.message
    })

    }
}
// exports.deletepatient= async(req,res)=>{
//     try {const{patientid}=req.params.id
//     const todelete= await patientmodel.findByIdAndDelete(patientid)
//      if(todelete){
//            return res.status(200).json({
//                 message:"succesfully deleted",
               

//             }) }else{
//                 res.status(404).json({
//                     message:"could not delete"
//                 })
//             }
        
//     } catch (error) {
//         res.status(500).json({
//         message:error.message
//     })
        
//     }
// }