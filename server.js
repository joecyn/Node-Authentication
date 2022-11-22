const UserRouter=require("./Routes/UserRouter");
const express=require("express");
const mongoose=require("mongoose");
const flash = require('connect-flash');
const cookieParser= require("cookie-parser");
const PORT=process.env.PORT || 3001;
const app =express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(flash())
//VIEW ENGINE
app.set("view engine","ejs")

//DB CONNECTION
mongoose.connect("mongodb://0.0.0.0:27017/Authentification")
        .then(()=>{
            console.log("Connected!")
        })
        .catch((err)=>{
            console.log(err)
        })
//ROUTES
app.use("/User",UserRouter);



app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
});

