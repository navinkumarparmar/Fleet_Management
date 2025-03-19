const checkpermission = (allowroles = [])=>{


    return async function(req,res,next) {
        try {
            if(!allowroles.includes(req.user.role)){
                return res.status(403).json({
                    message: "you dont have permission to access to this resorces"
                })
            }
            next();
        
        } catch (error) {
            
          return res.status(500).json({
            message: "something went wrong",
            error: error.message
          })
        }

           
    }
}

module.exports = checkpermission