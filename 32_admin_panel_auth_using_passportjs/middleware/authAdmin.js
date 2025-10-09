
const authAdmin = async(req,res,next)=>{
    try{

        if(req.cookies.userId){
            next();
        }else{
            return res.redirect('/');
        }

    }catch(err){
        console.log(err.message);
        return res.status(400).json({message:"Unauthorised!"});
    }
}


module.exports = authAdmin;