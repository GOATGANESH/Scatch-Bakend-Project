import asyncHandler from "../utils/asyncHandler.js"

const ownerRegister = asyncHandler(async (req,res)=>{
    res.status(200).json({
        success:true,
        message:"OK"
    })
})

export {
    ownerRegister
}