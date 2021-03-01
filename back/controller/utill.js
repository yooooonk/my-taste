exports.uploadImage = async(req,res,next)=>{
    console.log(req.files);
    res.status(200).json(req.files.map((v)=>v.path));
}