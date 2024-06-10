import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";


const signup =  async (req, res,next) => {
    const {username,email,password}=req.body;
    if(!username || !email || !password)
    {
        res.status(400).json({ error: 'Username, email, and password are required' });
    }
    const hashPassword=bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashPassword})


    try{
        await newUser.save();
        console.log(newUser._id);
        res.status(201).json("User created successfully")
    }
    catch(error)
    {
        // res.status(500).json(error.message)
        next(error)
    }
    
    console.log(req.body._id);
};

export const signin =async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'));
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Wrong credential"));
        const expirationTime = new Date(Date.now() + 60000); // 60000 milliseconds = 1 minute

        // JWT_SECRET='fdufgbrftiir767846'
        const token=jwt.sign({id:validUser._id},'fdufgbrftiir767846')
        const {password:pass,...rest}=validUser._doc;// to hide password 
        res.cookie("access_token",token,{httpOnly:true,expires: expirationTime }).status(200).json(rest)
    }catch(err)
    {
        next(err)
    }
}

export default signup;

