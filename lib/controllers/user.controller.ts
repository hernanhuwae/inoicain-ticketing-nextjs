"use server"

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { Promise } from "mongoose";
import Event from "../database/models/event.model";
import Order from "../database/models/order.model";
import { revalidatePath } from "next/cache";
import { connect } from "@/db";

export const createUser= async(user:CreateUserParams)=>{
    try {
        await connect()

        const newUser= await User.create(user)

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

export const getUserById= async(userId:String)=>{
    try {
        await connect()
        const user= await User.findById(userId)

        if(!user) throw new Error ("User Not Found")
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}

export const updateUser= async(clerkId: String, user:UpdateUserParams)=>{
    try {
        await connect()

        const updateUser= await User.findOneAndUpdate({clerkId}, user, {new:true})

        if(!updateUser) throw new Error("Can`t update User!")
        return JSON.parse(JSON.stringify(updateUser))
    } catch (error) {
        handleError(error)
    }
}

export const deleteUser= async(clerkId: String)=>{
    try {

        await connect()

        //Todo: 1. Search userId to delete
        const userIdDelete= await User.findOne(clerkId)

        if(!userIdDelete) throw new Error("User not found")
        
        //Todo: 2. Remove relationship database table models
        await Promise.all([

            //! 1. Event:
            Event.updateMany(
                {_id: {$in : userIdDelete.events}},
                {$pull: {organizer: userIdDelete._id}},
            ),

            //! 2. Order:
            Order.updateMany(
                {_id: {$in:userIdDelete.orders}},
                {$unset: {buyer:true}}
            )
        ])

        const userDelete= await User.findByIdAndDelete(userIdDelete._id)
        revalidatePath('/')

        return userDelete? JSON.parse(JSON.stringify(userDelete)) : null

    } catch (error) {
        handleError(error)
    }
}


