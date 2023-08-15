import { Schema } from "mongoose";

export interface UserAddress{
    name:string,
    state:string,
    city:string,
    address:string,
    id:string,
    email:string,
    phonenumber:string,
    createdAt:Date,
    updatedAt:Date,
    userId:Schema.Types.ObjectId
}

export interface UserAddresDocument extends UserAddress{

}
