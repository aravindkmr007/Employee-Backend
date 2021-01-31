import express from "express";
import mongoose from "mongoose";
import EmpolyeeDatabase from "./db.js";
import cors from 'cors'
import bodyParser from "body-parser"
const app = express();
const port = process.env.PORT || 8000;
//usr name =EmpolyeeCRM //password = EmpolyeeCRMDBaravinddb
const connection_url =
  "mongodb+srv://aravind:aravinddb@cluster0.awbkh.mongodb.net/EmpolyeeDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
},() =>
{
  console.log("db Connected")
});
app.use(cors())
app.use(bodyParser.json())
app.get("/",async(req,res) => 
{
  try 
  {
    const posts = await EmpolyeeDatabase.find();
    res.json(posts)

  }
  catch (err){
    console.log(err)
  }
})

app.post("/",async(req,res)=> 
{
  const post  = new EmpolyeeDatabase(
    {
      emp_id: req.body.emp_id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      salary: req.body.salary
    }
  )
  try{
  const savedPost = await post.save()
  console.log(savedPost)
  }
  catch (err) 
  {
    console.log(err)
  }
})
app.get("/:postId", async(req,res) => 
{
  try{
    const post  = await EmpolyeeDatabase.findById(req.params.postId)
    res.json(post);
  }
  catch (err)
  {
    res.json(err);
  }
})
app.delete("/:postId" , async (req,res) => 
{
  try
  {
   const deletePost= await EmpolyeeDatabase.remove({ _id: req.params.postId})
    res.json(deletePost)
  }
  catch(err)
  {
    res.json(err)

  }
})
app.patch("/:postId", async (req,res) => 
{
  try{
    const updatePost = await EmpolyeeDatabase.updateOne({_id : req.params.postId},{
      $set: { emp_id : req.body.emp_id,
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        email: req.body.email,
        salary: req.body.salary
      }
    } )
    res.json(updatePost)
  }
  catch(err){
    res.json(err)
  }
})
app.use(express.json());
app.listen(port, console.log("listening to server"));
