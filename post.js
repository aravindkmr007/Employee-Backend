import express from "express"
const router = express.Router();
router.get("/",(req,res) => 
{
    res.send("We are on Post")
})
 
export default router