import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8, 
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

userSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

const User = mongoose.model("User", userSchema);
export default User;
