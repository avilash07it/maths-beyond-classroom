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

const getAllPOTDs=async(req,res)=>{
    try{
        const potds=await potdService.getAllPOTDs();
        res.status(200).json({
            success: true,
            message: "POTDs retrieved successfully",
            data: potds
        });
    } catch(error){
        console.error("Get All POTDs Error:",error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getPOTDById = async (req, res) => {
  try {
    const { id } = req.params;

    const potd = await potdService.getPOTDById(id);

    res.status(200).json({
      success: true,
      data: potd,
    });
  } catch (error) {
    console.error("Get POTD Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports={createPOTD, getAllPOTDs, getPOTDById};