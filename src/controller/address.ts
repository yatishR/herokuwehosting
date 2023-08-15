import {Response,NextFunction} from "express"
import AddressModel from '../model/useraddress'
import { ExpressRequestInterface } from "../types/request.interface";
export const getUserAddress= async(req:ExpressRequestInterface,res:Response,next:NextFunction)=>{
    try{
        if(!req.user){
            return res.sendStatus(401);
        }

     const getaddress = await AddressModel.find({userId:req.user.id});
     res.send(getaddress);
    }
    catch (err){
       next(err);
    }
  };
  export const createUsreAddess= async(req:ExpressRequestInterface,res:Response,next:NextFunction)=>{
    try{
        if(!req.user){
            return res.sendStatus(401);
        }

     const newAddress = new AddressModel({
        name:req.body.name,
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        userId:req.user.id

     });
     const savedNewAddress = await newAddress.save();
     res.send(savedNewAddress);
    }
    catch (err){
       next(err);
    }
  };