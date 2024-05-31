import mongoose, { Schema, models } from "mongoose";
const weatherSchema = new Schema({
    
    user_id:{
        type:String,
        required:true
    },
    country_code:{
        type:String,
        required:true
    },
    city_name:{
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    lon:{
        type:Number,
        required:true
    },
},{
    timestamps : true
})
const History = models.WeatherHistory || mongoose.model('WeatherHistory', weatherSchema)
export default History
