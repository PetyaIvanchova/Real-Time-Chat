import MESSAGES from "../common/messages.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

export const get = async (loggedInUserId) => {
  try {
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return filteredUsers;
  } catch (error) {
    logger.error(error.message);
    return MESSAGES.INTERNAL_SERVER_ERROR;
  }
};
