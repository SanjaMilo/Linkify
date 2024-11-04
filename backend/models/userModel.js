import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // This will be used to verify time validity for requests access (30 days). The value will be set on the first route request
    firstRequestDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model('user', UserSchema);

export default UserModel;