import { connectMongoDB } from "@/connectDB/mongodb"
import User from "@/models/user"
import History from "@/models/weatherHistory"
import { NextResponse } from "next/server"

export async function POST(req){

    try {
        // Destructure data from the request object
        const {email} = await req.json()
        await connectMongoDB()
        const user = await User.findOne({email})
        const id = user._id

        // get weather history for specified user
        const data = await History.find({user_id:id})
        return NextResponse.json(data,{ status:201 })
    } catch (error) {
        console.log(error)
    }

}