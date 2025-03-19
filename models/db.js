const mongoose = require('mongoose');

const connectDB = async()=>{

   try {
     await mongoose.connect(process.env.DBURL)
      console.log("database connected")
   } catch (error) {
      console.log(error.message);
      console.log("Error while connecting database")
    
   }

}

module.exports = connectDB