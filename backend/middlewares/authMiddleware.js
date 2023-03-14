const JWT = require("jsonwebtoken");

module.exports=async(req,res,next)=>{
    //1 because 0 has bearer :
    console.log("bsby",req.headers)
    const token =req.headers['authorization'].split(" ")[1]
   try {
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(200).send({message:'Auth Failed',success:false})
        }else{
            req.body.userId = decode.id
            next()
        }

    })
   } catch (error) {
    console.log(error)
    return res.status(401).send({message:'Auth Failed',success:false})

   }
}