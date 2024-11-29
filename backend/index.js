require('dotenv').config()
const express =require('express');
const { createtodo, updatetodo } = require('./types');
const {todo}= require("./db");
const app=express();
app.use(express.json());

app.post("/todo", async function(req,res){
    const createPayload= req.body;
    const parsepayload=createtodo.safeParse(createPayload);
    if(!parsepayload.success){
        res.status(411).json({
            msg:"You sent wrong input",
        })
        return;
    }
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completes:false
    })
    res.json({
        msg:"Todo Created"
    })
})

app.get("/todos",async function(req,res){
    const todos =await todo.find();
    res.json({
        todos
    })
})

app.put("/completed",async function(req,res){
const updatepayload=req.body();
const parsepayload= updatetodo.safeParse(updatepayload);
if(!parsepayload.success){
    res.status(411).json({
        msg:"You sent wrong input",
    })
    return;

}
await todo.update({
    _id: req.body.id
},{
    completed:true
})

})

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected with db');
    app.listen(port,()=>{
        console.log('listening on port')+port;

    });
}
main()