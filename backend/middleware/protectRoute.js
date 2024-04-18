import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import STATUS_CODES from '../common/statusCodes.js';
import MESSAGES from '../common/messages.js';
import logger from '../utils/logger.js';

const protectRoute = async (req,res, next) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(STATUS_CODES.Unauthorized).json({error: MESSAGES.UNAUTHORIZED});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(STATUS_CODES.Unauthorized).json({error: MESSAGES.UNAUTHORIZED});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(STATUS_CODES.Unauthorized).json({error: MESSAGES.USER_NOT_FOUND});
        }

        req.user = user;

        next();

    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({error: MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

export default protectRoute;