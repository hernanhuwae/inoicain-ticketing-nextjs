"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import Category from "../database/models/category.model"
import { connect } from "@/db"
import { NextResponse } from "next/server"

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connect();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connect();

    const categories = await Category.find();

    // return JSON.parse(JSON.stringify(categories));
    return NextResponse.json({
        message: "success from GET",
        status: 200,
        data: categories,
      });
  } catch (error) {
    return NextResponse.json({
        message: "Errror from GET",
        status: 404,
        data: error,
      });
  }
}