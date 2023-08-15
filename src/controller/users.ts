// create logic regarding token and request
import { Request ,Response,NextFunction} from "express"
import UserModel from '../model/user';
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import  jwt  from "jsonwebtoken";
import { secret } from "../../config";
import { ExpressRequestInterface } from "../types/request.interface";
const normalizeUser = (user:UserDocument)=>{
    // create token logic
    const token = jwt.sign({id:user.id,email:user.email},secret)
    return {
        email:user.email,
        username:user.username,
        id:user.id,
        token:`Bearer ${token}`,
    };
}
export const register= async(req:Request,res:Response,next:NextFunction)=>{
  try{
   const newUser = new UserModel({
    email:req.body.email,
    username:req.body.username,
    password:req.body.password,
   });

   console.log('newUser', newUser)
   const savedUser = await newUser.save();
   res.send(normalizeUser(savedUser));
   console.log("savedUser", savedUser)
  }
  catch (err){
    if(err instanceof Error.ValidationError){
        console.log('err')
        const message = Object.values(err.errors).map(err=>err.message)
         return res.status(422).json(message);
    }      
     next(err);
  }
};

export const login = async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
      const user = await UserModel.findOne({email:req.body.email}).select('+password');
      const errors = {emailOrPassword:"Incorrect eamil or Password"};
      if(!user){
        //console.log("dfsdfsd");
        return res.status(422).json(errors);
      }
// password comapire

const  isSamePassword = await user.validatePassword(req.body.password)
 if(!isSamePassword){
    return res.status(422).json(errors);
 }
      
res.send(normalizeUser(user));
    } catch(err){
         next(err)
    };
};

export const currentUser = (req:ExpressRequestInterface,res:Response)=>{
   if(!req.user){
    return res.sendStatus(401)
   }
    res.send(normalizeUser(req.user));
}