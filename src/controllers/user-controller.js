import userService from "../service/user-service.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const SALT_ROUNDS = 10;

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userService.signup({
      email,
      password:hashedPassword,
      username,
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Successfully created the user",
      data: user,
      success: true,
      err: {},
    });
  } catch (error) {
    console.error("Signup Controller Error:", error);

    if (!error.statusCode) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        err: error.message,
        success: false,
      });
    }

    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Signin successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const check = async (req,res)=>{
    res.send('<h1>Home3</h1>');
}

export default {
  signup,
  check,
  signin
};
