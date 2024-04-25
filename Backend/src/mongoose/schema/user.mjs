import mongoose from "mongoose";

export async function connectDB() {
    try{
        await mongoose.connect("mongodb+srv://sunny51305527:Sunny%405527@cluster0.h88ddxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
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