import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import MESSAGES from "../common/messages.js";

export const signupservice = async (
  fullName,
  username,
  password,
  confirmPassword,
  gender
) => {
  const response = {
    message: MESSAGES.SUCCESSFULLY_SIGNUP,
    token: null,
    success: true,
  };

  try {
    if (password !== confirmPassword) {
      //return res.status(400).json({ error: "Password didn't match" });
      response.message = MESSAGES.PASSWORD_MISSMATCHED;
      response.success = false;
    }

    const user = await User.findOne({ username });

    if (user) {
      //return res.status(400).json({ error: "Username already exists!" });
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
    }

    return response;
  } catch (error) {
    console.log(error.message);
    return response.message;
  }
};

export const loginservice = async (username, password) => {
  const response = {
    message: MESSAGES.SUCCESSFULLY_LOGIN,
    token: null,
    success: true,
  };
  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      //return res.status(400).json({ error: "Invalid username or password!" });
      response.message = MESSAGES.INVALID_USERNAME_0R_PASSWORD;
      response.success = false;
    }
    

    return user;

  } catch (error) {
    console.log(error.message);
    return response.message;
  }
};
