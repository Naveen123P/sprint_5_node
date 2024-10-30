const getAllFactory = function(ElementModel) {
    return async function (req,res){
        try{
         const elementDetails = await ElementModel.find()
         res.status(200).json({
             status:"success",
             message:elementDetails
         })
        }catch(err){
             res.status(404).json({
                 status:"failure",
                 message:err.message
             })
        }}
}

const createFactory = function(ElementModel){
    return async function (req,res){
        try{
            const elementDetails = req.body;
            //Adding User to DB
            const element = await ElementModel.create(elementDetails)   
            res.status(200).json({
                status:"success",
                message:`added the element`,
                element,
            })     
        }catch(err){
            res.status(500).json({
                status:"failure",
                message:err.message
            })
        }
    }
}

const getByIdFactory = function(ElementModel){
    return async function (req,res){
        try{
            const elementId = req.params.elementId;
            const elementDetails = await ElementModel.findById(elementId);
        if(elementDetails == "no user found"){
            throw new Error(`user with ${elementId} not found`)
        }else{
            res.status(200).json({
                status:"success",
                message:elementDetails
            })
        }
        }catch(err){
            res.status(404).json({
                status:"failure",
                message:err.message
            })
        }
    }
}

const deleteByIdFactory = function(ElementModel){
    return async (req, res) => {
        let { elementId } = req.params
        try{
            let Element = await ElementModel.findByIdAndDelete(elementId);
            res.status(200).json({
                status:"success",
                message:Element,
            })
        }catch(err){
            res.status(404).json({
                status:"failure",
                message: `Element with id: ${elementId} not found to Delete`
            })
        }
    }    
}

module.exports = {
    getAllFactory,
    createFactory,
    getByIdFactory,
    deleteByIdFactory
}