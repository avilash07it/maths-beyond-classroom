const express=require("express");
const router=express.Router();
const potdController=require("../controllers/potd.controller");

router.post("/",potdController.createPOTD);
router.get("/",potdController.getAllPOTDs);
router.get("/today", potdController.getTodayPOTD);
router.get("/:id/hint", potdController.getHint);
router.get("/:id/solution", potdController.getSolution);
router.get("/:id",potdController.getPOTDById);

router.delete("/:id",potdController.deletePOTD);
router.put("/:id",potdController.updatePOTD);


module.exports=router;