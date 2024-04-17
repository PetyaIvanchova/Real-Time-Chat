import MESSAGES from '../common/messages.js';
import STATUS_CODES from '../common/statusCodes.js';

import {get} from '../services/userService.js'; 
import {usersLoggers} from '../utils/logger.js';

export const getUsersForSideBar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;

        const filteredUsers = await get(loggedInUserId);
        
        res.status(STATUS_CODES.OK).json(filteredUsers);
    } catch (error) {
        //console.log("Error in getUsersForSideBar: ", error.message);
        usersLoggers.log('error', MESSAGES.ERROR_IN_GET_USERS_FOR_SIDEBAR);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.INTERNAL_SERVER_ERROR);
    }
}