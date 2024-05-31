import { connectMongoDB } from "@/connectDB/mongodb";
import User from "@/models/user";
import History from "@/models/weatherHistory";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
        // Destructure data from the request object
        const{email, country_code, city_name, lat, lon} = await req.json()
        await connectMongoDB()

        // Get user id using the email
        const user = await User.findOne({email})
        const user_id = user._id
        
        // Store weather data in history
        await History.create({ user_id, country_code, city_name, lat, lon })
        return NextResponse.json({ message: 'Data updated' },{ status:201 })
    } catch (error) {
        console.log(error)
        
    }
}