require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
mongoose.connect("mongodb://localhost:27017/userDB");
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});
userSchema.plugin(encrypt, {secret:process.env.SECRET , encryptedFields:["password"]});
const User = mongoose.model("User",userSchema);


app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    const userInfo = new User({
        email:req.body.username,
        password:req.body.password
    });
    userInfo.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("secrets");
        }
    });
});

app.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email:username},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            if(result){
                if(result.password === password){
                    console.log("the password is:"+password);
                    res.render("secrets");
                }
                else{
                    res.send("Your password is incorrect");
                }
            }
            else{
                res.send("You are not registered yet, please first go register!");
            }
        }
    });
});


app.listen(3000,()=>{
    console.log("Sever is up and running");
});