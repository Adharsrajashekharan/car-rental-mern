const JWT = require("jsonwebtoken");

module.exports=async(req,res,next)=>{
    //1 because 0 has bearer :
    // console.log("bsby",req.headers)
    if(!req.headers['authorization']){
        return res.status(401).json({message:'Unauthorized access'})
    }
    
    const token =req.headers['authorization'].split(" ")[1]
    console.log("uuuuu",token)
   try {
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(200).send({message:err.message,success:false})
        }else{
            req.body.userId = decode.id
            next()
        }

    })
   } catch (error) {
    console.log(error.message)
    return res.status(401).send({message:error.message,success:false})

   }
}