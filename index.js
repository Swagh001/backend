const express=require("express");
const {connection}=require("./config/db")
const {UserModel} =require("./model/UserModel")
const {BlogModel} =require("./model/BlogModel")

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()
const {Authentication}=require("./Middlware/authentication")

const app=express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("khata");
})


app.post("/signup",async(req,res)=>{
        const {email,password}=req.body;
        bcrypt.hash(password, 3,async function(err, hash) {
            const data=new UserModel({
                email,
                password: hash
            })
            await data.save();
            res.send("signup done");
        })
    })

    app.post("/login",async(req,res)=>{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            const hash_pass=user.password
            bcrypt.compare(password, hash_pass, function(err, result) {
                if(result){
                    var token = jwt.sign({ email:email}, process.env.Secret_Key);
                    res.send({"message":"login done","token":token});
                }
                else{
                    res.send("wrong password");
                }
            });
        }
        else{
            res.send("user not found");
        }
    })

app.get("/blog/get",async (req,res)=>{
    const data=await BlogModel.find();
    console.log(data);
    res.send({data});
})

app.post("/blog/post",Authentication,async(req,res)=>{
    const {title,description,}=req.body;
    const email=req.user_email;
    console.log(email);
    const blogData= new BlogModel({
        title,
        description,
        author_email:email
    })
    await blogData.save();
    res.send("blog done");
})

app.delete("/blog/:id",Authentication,async(req,res)=>{
    const id = req.params.id
    // console.log(email);
    await BlogModel.findOne({_id : id})
    await BlogModel.findByIdAndDelete(id)
    res.send("blog delete");
})

app.listen(8081,async()=>{
    try{
        await connection
        console.log("connected")
    }
    catch(err){
        console.log("not connected")
    }
    
})


