const express=require("express");
const router=express.Router();
const potdController=require("../controllers/potd.controller");

router.post("/",potdController.createPOTD);
module.exports=router;