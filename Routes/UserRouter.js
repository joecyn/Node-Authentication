const express=require("express");
//const { check, validationResult } = require('express-validator');
const Router=express.Router();
const LoginController=require("../Controllers/LoginController")
const RegisterController=require("../Controllers/RegisterController");
const isAuthenticated = require("../Middlewares/auth");
const User=require("../Models/UsersModel")
const Post=require("../Models/PostsModel")


//Login
Router.get("/Login",(req,res)=>{
    const Message=""
   res.render("Pages/Login",{Message:Message})
   })

Router.post("/Login",LoginController)

//Register
Router.get("/Register",(req,res)=>{
    const Message =" "
    res.render("Pages/Register",{Message:Message})
})
Router.post("/Register",RegisterController)

//SIGNOUT ROUTE
Router.get("/SignOut",isAuthenticated,(req,res)=>{
    res.cookie("jwt"," ",{maxAge:1});
    res.redirect("/user/Login")
}
)
//Home route
Router.get("/Home",isAuthenticated,async(req,res)=>{
    //const mtu=await User.findById({_id:"6363eb3154f20eba4588d951"})
    const users=await User.find()
    //The following line joins two colections which are the Users collection and Posts collection
    const post= await Post.find().populate('user')
    res.render("Pages/Home",{posts:post,users:users})
})
//New Posts Route
Router.get("/NewPost",isAuthenticated,async(req,res)=>{
    const LoggedInUser=await User.findOne({_id:req.user.id})
    res.render("pages/NewPost",{user:LoggedInUser})
})
Router.post("/NewPost",isAuthenticated,async(req,res)=>{
    
    const{title,description,user}=req.body;
    try {
        const newPost=await Post.create({
            title:title,
            description:description,
            user:user
        })
        res.redirect("/user/Home")
    } catch (error) {
        console.log(error)
    }

})
module.exports=Router;