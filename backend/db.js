const mongoose =require("mongoose");



const todoschema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

module.exports= mongoose.model('todo',todoschema);