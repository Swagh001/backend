const mongoose=require("mongoose");

const UserScema=new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const UserModel=mongoose.model("user",UserScema);

module.exports={UserModel};