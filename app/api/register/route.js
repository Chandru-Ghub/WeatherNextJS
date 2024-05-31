import { connectMongoDB } from "@/connectDB/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
export async function POST(req){
        try {           
            // Destructure data from the request object
            const {name, email, password} = await req.json()
            await connectMongoDB()

            // check email exixts
            let checkEmail = await User.findOne({email})
            if(checkEmail){
                return NextResponse.json({ message:'Email Already exists!'})
            }

            // hash the password before store it in DB
            const hashedPassword = await bcrypt.hash(password, 10)
            await User.create({ name, email, password:hashedPassword })
            return NextResponse.json({ message: 'Data registered' },{ status:201 })
        } catch (error) {
            return NextResponse.json({
                message: "An error occured >>>>>>>>>"
            }, { status: 500})
        }
}