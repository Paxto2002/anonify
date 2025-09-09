// src/app/api/health/route.ts
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET() {
  const hasMongoEnv = !!process.env.MONGODB_URI;
  try {
    await dbConnect();
    return NextResponse.json({
      success: true,
      env: { mongodbPresent: hasMongoEnv },
      mongooseReadyState: mongoose.connection.readyState, // 1 = connected
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed to connect to DB",
      env: { mongodbPresent: hasMongoEnv },
      error: err?.message || String(err),
    }, { status: 500 });
  }
}
