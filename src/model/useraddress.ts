// create user Schema
import { Schema, model } from "mongoose";
import { UserAddresDocument } from "../types/user.addressinterface";

const userAddressSchema = new Schema<UserAddresDocument>(
  {
    name: {
      type: String,
      required: [true, "name is reequired"],
      validate: [],
    },
    state: {
      type: String,
      required: [true, "state is required"],
    },
    city: {
      type: String,
      required: [true, "city is reequired"],
      validate: [],
    },
   
    address: {
      type: String,
      required: [true, "address is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phonenumber: {
      type: String,
      required: [true,""],
    },
    userId: {
        type:Schema.Types.ObjectId,
        required: true
    },
  },
  
  {
    timestamps: true,
  }
);
export default model<UserAddresDocument>("UserAddressSchema", userAddressSchema);

