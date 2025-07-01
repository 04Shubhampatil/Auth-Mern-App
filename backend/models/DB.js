import mongoose from "mongoose"
import "dotenv/config"

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log(`mongodb connect successfully on port${process.env.MONGODB_URL}`);
    
}).catch((error)=>{
    console.log(`mongodb connection failed with error ${error.message}`);
    process.exit(1);

})

