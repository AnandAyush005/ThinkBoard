const mongoose = require('mongoose');

const connectDB = async ()=>{

  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  }catch(error){
    console.error("Error encountered while connecting to MONGODB", error);
    process.exit(1);
  };

}


module.exports = {connectDB};