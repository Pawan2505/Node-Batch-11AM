const jwt = require('jsonwebtoken');


const authAdmin = async(req,res,next)=>{

    try{
    const token =  req.headers["authorization"];

    if(token){

         let decoded = jwt.verify(token.slice(7,token.length), 'secret');

         req.user = decoded;

         next();

    }else{
        
        return res.status(200).json({message:"Token Not Found!"});
    }

    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Unauthorization"});

    }

}


module.exports = authAdmin;