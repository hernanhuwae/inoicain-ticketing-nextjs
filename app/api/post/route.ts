import { connect } from "@/db";
import postModel from "@/lib/database/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();

    const users = await postModel.find();

    return NextResponse.json({
      message: "success from GET",
      status: 200,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Errror from GET",
      status: 404,
      data: error,
    });
  }
};