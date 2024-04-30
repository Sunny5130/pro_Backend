import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
    }
}

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

export const User = mongoose.model("User",userSchema);