import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

export async function dbConnect(): Promise<void> {
  // void in typescript means any kind of data is acceotible
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully")
  } catch (error) {
    console.log("Database connection failed: ", error)
    process.exit(1)
  }
}
