const bcrypt=require("bcrypt")
const User=require("../Models/UsersModel")
const jwt =require("jsonwebtoken")

const RegisterController=async(req,res)=>{
     //creating JWT token
     const maxAge=3*26*60*60;
     const createToken=(id)=>{
         return jwt.sign({id},"mutujaba",{
            expiresIn:maxAge
         });
     }
    const{name,email,password}=req.body;
    if(!name || !email || !password)
    {   const Message="All Fields are Required!"
        //return res.json({"message":"All fields are required!"})
        res.render("Pages/Register",{Message:Message})
    }
    else{
        const findUser= await User.findOne({email:email})
    const username=await User.findOne({name:name})
    if(findUser || username){
        const Message="User already Exists. Please Login "
     //return res.json({"Message":"User already exists.Please login"})
       res.render("Pages/Register",{Message:Message})
    }
    else{

        try{
            const hashedPassword= await bcrypt.hash(password,10);
            const newUser= await User.create({name:name,email:email,password:hashedPassword})
            //create token
            const token=createToken({id:newUser._id,name:newUser.name});
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
            //req.flash('message', 'User Created Successfully.Please Login');
            res.redirect("/user/Login")
        }
        catch(err){
            console.log(err)
        }
    }
    
        
    }
    
    
}
module.exports=RegisterController