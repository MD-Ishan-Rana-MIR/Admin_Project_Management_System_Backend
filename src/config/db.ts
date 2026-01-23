import mongoose from "mongoose";
import { config } from "./config";

if (!config.db_url) {
  throw new Error("MONGO_URI is not defined in config");
}

// Cached connection variable for serverless
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectDatabase = async () => {
  if (cached.conn) {
    return cached.conn; // use existing connection
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(config.db_url, {
      bufferCommands: false, // Disable buffering
    });
  }

  cached.conn = await cached.promise;
  console.log("--------MongoDB Connected--------");
  return cached.conn;
};

export default connectDatabase;
