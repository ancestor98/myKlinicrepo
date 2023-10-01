
const authmiddle=(req,res,next)=>{
        const user=req.body
        if (user. isVerified===true) {
            next()
            
             }else{
                return res.status(401).json({
                message:"you are not authorized "
                })

             }
    }

