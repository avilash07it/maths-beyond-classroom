const prisma=require("../configuration/prisma");

const createPOTD=async(potdData) =>{
    return await prisma.pOTD.create({
        data: {
title: potdData.title,
problemImageUrl: potdData.problemImageUrl,
solutionImageUrl: potdData.solutionImageUrl,
status: potdData.status,
exam: potdData.exam,
topic: potdData.topic,
        },
    });
    return potd;
};
       

module.exports={createPOTD};