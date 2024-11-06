const getAllFactory = function(ElementModel) {
    return async function (req,res){
        try{
         const elementDetails = await ElementModel.find()
         if(elementDetails.length == 0){
            throw new Error("No Elements Found");
        }
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
            if(elementDetails == null){
                throw new Error(`Element with id: ${elementId} not found`)
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
            if(Element == null){
                throw new Error(`Element with id: ${elementId} not found to Delete`)
            }else{
                res.status(200).json({
                    status:"success",
                    message:"Deleted Successfully",
                    deletedElement:Element,
                })
            }            
        }catch(err){
            res.status(404).json({
                status:"failure",
                message: err.message, 
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