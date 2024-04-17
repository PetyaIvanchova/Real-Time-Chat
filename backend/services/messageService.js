import MESSAGES from "../common/messages.js";
import STATUS_CODES from "../common/statusCodes.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from '../socket/socket.js'

export const send = async (message, senderId,receiverId) => {
  const response = {
    message: MESSAGES.SUCCESSFULLY_SEND_MESSAGE,
    success: true,
  };

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);

      //await conversation.save();
      //await newMessage.save();

      await Promise.all([conversation.save(), newMessage.save()]);
    } else {
      response.message = MESSAGES.CAN_NOT_SEND_MESSAGE,
      response.success = false;
    }

    //Socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //io.to(id).emit() is used to send events to specific clients
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return newMessage;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const get = async (senderId, userToChatId) => {
  const response = {
    message: MESSAGES.SUCCESSFULLY_GET_MESSAGE,
    success: true,
  };

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      //return res.status(STATUS_CODES.OK).json([]);
      return ([]);
    }

    const message = conversation.messages;
    if (!message) {
      
      response.message = MESSAGES.CAN_NOT_GET_USERS;
      response.success = false;
    }

    return message;
  } catch (error) {
    console.log(error.message);
    return response.message;
  }
};
