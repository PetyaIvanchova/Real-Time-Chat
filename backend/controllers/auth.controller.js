import MESSAGES from '../common/messages.js';
import STATUS_CODES from '../common/statusCodes.js';
import generateTokenandSetCookie from "../utils/generateToken.js";

import {signupservice, loginservice} from '../services/authService.js';

import {authLoggers} from '../utils/logger.js';

export const signup = async (req,res) => {
    try{
        const {fullName,username, password, confirmPassword, gender} = req.body;
       
        const response = await signupservice(
            fullName,
            username,
            password,
            confirmPassword,
            gender
        )
        
        return res.status(STATUS_CODES.CREATED).json({data: response})

    } catch (error) {
       // console.log("Error in signup controller", error.message)
        authLoggers.log('error', MESSAGES.ERROR_IN_SIGNUP_CONTROLLER);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.INTERNAL_SERVER_ERROR)
    }
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;

        const response = await loginservice(
            username,
            password
        )

        return res.status(STATUS_CODES.CREATED).json({data: response});
        
    } catch (error) {
        //console.log("Error in login controller!", error.message);
        authLoggers.log('error', MESSAGES.ERROR_IN_LOGIN_CONTROLLER);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.INTERNAL_SERVER_ERROR)
    }
}

export const logout = (req, res) => {
    try{
        res.cookie('jwt', "", {maxAge: 0})
        res.status(STATUS_CODES.OK).json(MESSAGES.LOGGED_OUT_SUCCESSFULLY);
    } catch (error){
        //console.log("Error in logout controller", error.message);
        authLoggers.log('error', MESSAGES.ERROR_IN_LOGOUT_CONTROLLER);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.INTERNAL_SERVER_ERROR)
    }
} 