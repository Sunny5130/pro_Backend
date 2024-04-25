import express from 'express';
import { User } from './src/mongoose/schema/user.mjs';
import bodyParser from "body-parser";
import { connectDB } from './src/mongoose/schema/user.mjs';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookiesMiddleware from './src/middleware/cookies_middleware.mjs';

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());


const PORT = process.env.PORT || 3000;
connectDB();


app.get("/",(req,res)=>{
    res.status(200).send("Hello World");
});

app.post("/register",async(req,res)=>{
    try{
        const { userName, password } = req.body;
        console.log("user: ", userName, "password: ", password);
        const existingUser = await User.findOne(
            {
                userName: userName
            }
        );
        if(existingUser) {
            res.status(400).send({msg:"User already exists!"});
        } else {
            const user = new User({userName,password});
            const token = jwt.sign({userName: userName,password: password},process.env.USER_SECRET_KEY);
            console.log(token);
            res.setHeader("Access-Control-Allow-Credentials",true);
            res.cookie("token",token,{
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                secure: false,
            });
            await user.save();
            res.status(201).send({msg:"User Created", token: token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal Server Error"});
    }
});

app.post("/login",async(req,res)=>{
    try{
        console.log(req.body);
        const { userName, password } = req.body;
        // console.log(userName, password);
        const findUser = await User.findOne(
            {
                userName: userName
            }
        )
        if(findUser && findUser.password === password){
            const token = jwt.sign({userName: userName,password: password},process.env.USER_SECRET_KEY);
            res.setHeader("Access-Control-Allow-Credentials",true);
            res.cookie("token",token,{
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                secure: false,
            });
            console.log(jwt.verify(token,process.env.USER_SECRET_KEY));

            res.status(200).send({msg:"Login Successful", token: token});
        }
        else{
            res.status(404).send({msg:"User not found"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal Server Error"});
    }
});

// app.get("/weather", cookiesMiddleware, weather);

app.post("/weather",cookiesMiddleware ,async (req, res) => {
    try {
        const { city } = req.body;
        console.log("city: ", city);
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5489631fd6mshf485e151fc22a89p1d0956jsn965800003331',
		        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        
        // Set cookies in the response
        // res.cookie('exampleCookie', 'exampleValue', { maxAge: 900000, httpOnly: true });
        // res.cookie('anotherCookie', 'anotherValue', { maxAge: 900000, httpOnly: true });
        res.status(200).send({ msg: "Weather Data", result: await response.json()});
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});


app.listen(PORT,()=>{
    console.log(`Listning to port ${PORT}`);
});