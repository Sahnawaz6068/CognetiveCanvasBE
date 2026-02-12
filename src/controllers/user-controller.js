import userService from "../service/user-service.js";
import { StatusCodes } from "http-status-codes";

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const user = await userService.signup({
      email,
      password,
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

const check = async (req,res)=>{
    res.send('<h1>Home3</h1>');
}

export default {
  signup,
  check
};
