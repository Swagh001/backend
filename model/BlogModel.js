const mongoose=require("mongoose");

const BlogScema=mongoose.Schema({
    title: {type : String, required : true},
    description: {type : String, required : true},
    author_email : {type : String}
})

const BlogModel=mongoose.model("blog",BlogScema);

module.exports={BlogModel};