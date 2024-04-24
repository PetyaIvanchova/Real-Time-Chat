import MESSAGES from '../common/messages.js';
import STATUS_CODES from '../common/statusCodes.js';

import {send, get} from '../services/messageService.js';
import logger from '../utils/logger.js';

export const sendMessage = async (req, res) => {
  try {
    const { text, photo } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    
    const newMessage = await send(
      senderId,
      receiverId,
      text,
      photo
    )

    res.status(STATUS_CODES.CREATED).json(newMessage);
  } catch (error) {
    logger.error(error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({error: MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const message = await get(senderId, userToChatId);
      
        res.status(STATUS_CODES.CREATED).json(message);
    } catch (error) {
        logger.error(error.message)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({error: MESSAGES.INTERNAL_SERVER_ERROR})
    }
}
