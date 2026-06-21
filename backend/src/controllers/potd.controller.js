const potdService=require("../services/potd.service");
const createPOTD=async(req,res) =>{
    try{
        const potd=await potdService.createPOTD(req.body);
        res.status(201).json({
            success: true,
            message: "POTD created successfully",
            data: potd
        });
    } catch(error){
  console.error("Create POTD Error:",error);
  res.status(500).json({
    success: false,
    message: error.message
  });
}
}

module.exports={createPOTD};