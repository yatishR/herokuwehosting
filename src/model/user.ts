// create user Schema
import { Schema, model } from "mongoose";
import { UserDocument } from "../types/user.interface";
import validator from "validator";
import bcryptjs from 'bcryptjs';

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "email is reequired"],
      validate: [validator.isEmail, "invalid email"],
      clearIndexes: { unique: true },
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    
  },
  
  {
    timestamps: true,
  }
);
userSchema.pre('save', async  function(next){
   if(!this.isModified("password")){
    return next();
   }
   try{
const salt = await bcryptjs.genSalt(10)
this.password = await bcryptjs.hash(this.password,salt)
   return next();
}catch(err){
    return next(err as Error);
   }
});

userSchema.methods.validatePassword = function(password:string){
   console.log("validatePassword",password)
    return bcryptjs.compare(password,this.password);
}
export default model<UserDocument>("User", userSchema);

