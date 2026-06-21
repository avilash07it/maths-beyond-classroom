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
            count: potds.length,
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

const deletePOTD=async(req,res)=>{
    try {
        const{id}=req.params;
        const potd=await potdService.deletePOTD(id);
        res.status(200).json({
            success: true,
            message: "POTD deleted successfully",
            data: potd,
        });
    } catch (error) {
        console.error("Delete POTD Error:",error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updatePOTD=async(req,res)=>{
    try {
        const{id}=req.params;
        const potd=await potdService.updatePOTD(id,req.body);
        res.status(200).json({
            success: true,
            message: "POTD updated successfully",
            data: potd,
        });
    } catch (error) {
        console.error("Update POTD Error:",error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getTodayPOTD = async (req, res) => {
  try {
    const potd = await potdService.getTodayPOTD();

    res.status(200).json({
      success: true,
      data: potd,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getHint = async (req, res) => {
  try {
    const { id } = req.params;

    const hint = await potdService.getHint(id);

    res.status(200).json({
      success: true,
      data: hint,
    });
  } catch (error) {
    console.error("Get Hint Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSolution = async (req, res) => {
  try {
    const { id } = req.params;

    const solution = await potdService.getSolution(id);

    res.status(200).json({
      success: true,
      data: solution,
    });
  } catch (error) {
    console.error("Get Solution Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports={createPOTD, getAllPOTDs, getPOTDById, deletePOTD, updatePOTD, getTodayPOTD, getHint, getSolution};