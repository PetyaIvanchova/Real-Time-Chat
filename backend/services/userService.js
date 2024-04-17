import MESSAGES from "../common/messages.js";
import User from "../models/user.model.js";

export const get = async (loggedInUserId) => {
  try {
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return filteredUsers;
  } catch (error) {
    console.log(error.message);
    return MESSAGES.INTERNAL_SERVER_ERROR;
  }
};
