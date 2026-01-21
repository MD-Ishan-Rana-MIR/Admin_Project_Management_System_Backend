import app from "./app";
import { config } from "./config/config";
import connectDatabase from "./config/db";


app.listen(config.port,async()=>{
    console.log(`Server is running http://localhost:${config.port}`);
    await connectDatabase();
    
})