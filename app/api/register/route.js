import { connectMongoDB } from "@/connectDB/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
export async function POST(req){
        try {
            const {name, email, password} = await req.json()
            await connectMongoDB()
            // check email exixts
            let checkEmail = await User.findOne({email})
            console.log(checkEmail)
            if(checkEmail){
                return NextResponse.json({ message:'Email Already exists!'})
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            await User.create({ name, email, password:hashedPassword })
            return NextResponse.json({ message: 'Data registered' },{ status:201 })
        } catch (error) {
            return NextResponse.json({
                message: "An error occured >>>>>>>>>"
            }, { status: 500})
        }
}