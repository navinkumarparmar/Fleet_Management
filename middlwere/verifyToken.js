const jwt = require("jsonwebtoken");

module.exports.verifyToken = async function(req, res, next){
  const token = req.header("Authorization");
  if (!token){
    return res.status(401).json({ message: "Access Denied" });
  } 

  try {
    const decoded = jwt.verify(token,process.env.secreatKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: "Invalid Token" ,
      error: error.message
    });
  }
};


