const express=require('express');
const router=express.Router();
const mocktestController=require('../controllers/mocktest.controller');
const authMiddleware=require("../middleware/auth.middleware");
const requireAdmin=require("../middleware/admin.middleware");

router.post('/create',authMiddleware,requireAdmin,mocktestController.createMockTest); 
router.get('/getall',mocktestController.getAllMockTests); 
router.get('/get/:id',mocktestController.getMockTestById); 
router.put('/update/:id',authMiddleware,requireAdmin,mocktestController.updateMockTest);
router.delete('/delete/:id',authMiddleware,requireAdmin,mocktestController.deleteMockTest);


module.exports=router;
