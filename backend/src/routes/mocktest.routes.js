const express=require('express');
const router=express.Router();
const mocktestController=require('../controllers/mocktest.controller');

router.post('/create',mocktestController.createMockTest);
router.get('/getall',mocktestController.getAllMockTests);
router.get('/get/:id',mocktestController.getMockTestById);
router.put('/update/:id',mocktestController.updateMockTest);
router.delete('/delete/:id',mocktestController.deleteMockTest);

module.exports=router;