import userService from "../service/user-service.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

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

const signin = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  };
};

const check = async (req,res)=>{
    res.send('<h1>Home3</h1>');
}

export default {
  signup,
  check,
  signin
};
