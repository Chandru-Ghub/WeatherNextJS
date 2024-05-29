import mongoose from "mongoose"

export const connectMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONDODB_URL)
        console.log('MongoDB connected')
    } catch (error) {
        console.log('Error connecting to MongoDB: ' , error)
    }
}