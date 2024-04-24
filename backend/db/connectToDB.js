import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import MESSAGES from '../common/messages.js';

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        logger.info(MESSAGES.CONNECTED_TO_MONGODB)
    } catch (error) {
        logger.error(error.message, MESSAGES.ERROR_CONNECTING_TO_MONDODB);
    }
}

export default connectToDB;