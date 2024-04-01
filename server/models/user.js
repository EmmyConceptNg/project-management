import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  industry: String,
  timeZone : String,
  phone : String,
  image : String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
   
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
    expires: 60 * 1,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
},{timestamps: true});

// // static signup method
// userSchema.statics.signup = async function (email, password) {
//   const exists = await this.findOne({ email });

//   if (exists) {
//     throw Error("Email already in use");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({ email, password: hash });

//   return user;
// };

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
