import MESSAGES from '../common/messages.js';
import STATUS_CODES from '../common/statusCodes.js';

import {get} from '../services/userService.js'; 
import logger from '../utils/logger.js';

export const getUsersForSideBar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;

        const filteredUsers = await get(loggedInUserId);
        
        res.status(STATUS_CODES.OK).json(filteredUsers);
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({error: MESSAGES.INTERNAL_SERVER_ERROR});
    }
}