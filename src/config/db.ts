import mongoose from "mongoose";
import { config } from "./config";

const connectDatabase =async ()=>{
    try {
    await mongoose.connect(config.db_url);
    console.log("--------MongoDB Connected--------");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDatabase;