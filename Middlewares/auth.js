
const jwt=require("jsonwebtoken")
const isAuthenticated= (req,res,next)=>{
    try{
    const token=req.cookies.jwt
       
        if(token){
            
            jwt.verify(token,"mutujaba",async(err,user)=>{
                if(err){
                    res.redirect("/User/Login")
                }
                else{
                    
                    req.user=user;
                    next(); 
                }
            })
        }
        else{
            
            
            res.redirect("/User/Login")
            
        }

    }
    catch(err){
        console.log(err)
    }
}
module.exports=isAuthenticated;