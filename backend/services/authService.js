import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import MESSAGES from "../common/messages.js";
import logger from "../utils/logger.js";

export const signupService = async (
  fullName,
  username,
  password,
  confirmPassword,
  gender
) => {
  const response = {
    message: MESSAGES.SUCCESSFULLY_SIGNUP,
    success: true,
    data: null
  };

  try {
    if (password !== confirmPassword) {
      response.message = MESSAGES.PASSWORD_MISSMATCHED;
      response.success = false;
    }

    const user = await User.findOne({ username });

    if (user) {
      response.message = MESSAGES.USERNAME_ALREADY_EXISTS;
      response.success = false;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    if (response.success) {
      const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });

      await newUser.save();

      response.data = newUser;
    }

    return response;
  } catch (error) {
    logger.error(error.message);
    return response.message;
  }
};

export const loginService = async (username, password) => {
  const response = {
    message: MESSAGES.SUCCESSFULLY_LOGIN,
    success: true,
    data: null
  };
  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      response.message = MESSAGES.INVALID_USERNAME_0R_PASSWORD;
      response.success = false;
    } else {
      response.data = user;
    }

    return response;

  } catch (error) {
    logger.error(error.message);
    return response.message;
  }
};
