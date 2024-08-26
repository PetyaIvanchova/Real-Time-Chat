import MESSAGES from "../common/messages.js";
import STATUS_CODES from "../common/statusCodes.js";
import generateTokenandSetCookie from "../utils/generateToken.js";

import { signupService, loginService } from "../services/authService.js";

import logger from "../utils/logger.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
   
    const response = await signupService(
      fullName,
      username,
      password,
      confirmPassword,
      gender
    );
     

    if (response.success=true) {
      generateTokenandSetCookie(response.data._id, res);
      return res.status(STATUS_CODES.CREATED).json({
        _id: response.data._id,
        fullName: response.data.fullName,
        username: response.data.username,
        profilePic: response.data.profilePic
      });
     
    } else {
      return res
      .status(STATUS_CODES.Unauthorized)
      .json({ error: MESSAGES.CAN_NOT_REGISTER });
    }
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await loginService(username, password);
   
    if (response.success=true) {
      generateTokenandSetCookie(response.data._id, res);
      return res.status(STATUS_CODES.CREATED).json({
        _id: response.data._id,
        fullName: response.data.fullName,
        username: response.data.username,
        profilePic: response.data.profilePic
      });
     
    } else {
      return res
      .status(STATUS_CODES.Unauthorized)
      .json({ error: MESSAGES.CAN_NOT_LOGIN });
    }
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res
      .status(STATUS_CODES.OK)
      .json({ message: MESSAGES.LOGGED_OUT_SUCCESSFULLY });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
