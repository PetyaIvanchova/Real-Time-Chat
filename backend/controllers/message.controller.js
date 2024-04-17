import MESSAGES from '../common/messages.js';
import STATUS_CODES from '../common/statusCodes.js';

import {send, get} from '../services/messageService.js';
import {messageLoggers} from '../utils/logger.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    
    const newMessage = await send(
      message
    )

    res.status(STATUS_CODES.CREATED).json(newMessage);
  } catch (error) {
    //console.log("Error is sendMessage controller: ", error.message);
    messageLoggers.log('error', MESSAGES.ERROR_IN_SENDMESSAGE_CONTROLLER);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getMessages = async (req, res) => {
    try{
       const { id: userToChatId } = req.params;
       const senderId = req.user._id;

        const message = await get(senderId, userToChatId);

        res.status(STATUS_CODES.CREATED).json(message);
    } catch (error) {
        //console.log('Error in getMessages controller', error.message);
        messageLoggers.log('error', MESSAGES.ERROR_IN_GETMESSAGE_CONTROLLER)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.INTERNAL_SERVER_ERROR)
    }
}
