const express=require("express");
const router=express.Router();
const potdController=require("../controllers/potd.controller");

router.post("/",potdController.createPOTD);
router.get("/",potdController.getAllPOTDs);
router.get("/:id",potdController.getPOTDById);

module.exports=router;