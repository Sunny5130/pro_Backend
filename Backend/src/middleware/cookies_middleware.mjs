import jwt from 'jsonwebtoken';
import { User } from '../mongoose/schema/user.mjs';

const cookiesMiddleware = async(req,res,next) => {
    
    const token = req.cookies.token;
    console.log("token: ", req.cookies);
    if (token) {
        try{
            const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
            const user = await User.findOne({username: decoded.username,password: decoded.password});
            if(!user){
                res.status(401).send('Invalid Credentials');
                return;
            }
            req.params.username =  decoded.username;  
            req.params.cookieData = decoded;
            req.params.userData = user;
        }catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).send('Invalid Token');
            return;
        }
    }
    else{
        res.status(401).send("no token found");
        return;
    }
    next();
};

export default cookiesMiddleware;