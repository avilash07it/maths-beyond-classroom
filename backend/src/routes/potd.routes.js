const express=require("express");
const router=express.Router();
const potdController=require("../controllers/potd.controller");
const authMiddleware=require("../middleware/auth.middleware");
const requireAdmin=require("../middleware/admin.middleware");

router.post("/",authMiddleware,requireAdmin,potdController.createPOTD);
router.get("/",potdController.getAllPOTDs);
router.get("/today", potdController.getTodayPOTD);
router.get("/:id/hint", potdController.getHint);
router.get("/:id/solution", potdController.getSolution);
router.get("/:id",potdController.getPOTDById);

router.delete("/:id",authMiddleware,requireAdmin,potdController.deletePOTD);
router.put("/:id",authMiddleware,requireAdmin,potdController.updatePOTD);


module.exports=router;
