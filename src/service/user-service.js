import UserRepository from "../repository/user-repo.js";


const userRepository = new UserRepository();

const signup = async (data) => {
  try {
    const result = await userRepository.create(data);
    return result;
  } catch (error) {
    console.error("UserService signup error:", error);
    throw error;
  }
};

export default {
  signup,
};
