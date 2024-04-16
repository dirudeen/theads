import mongoose from "mongoose";
let isConnected = false;
export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL is not set");
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
}
