import sendError from "./sendError";
import errorHandler from '../utils/errorHanler';
import mongoose from "mongoose";
import Admin from '../models/admin';
import successRes from "../utils/successRes";
import { verify } from "jsonwebtoken";

export const isAuth = (fucn) => async (req,res) =>
{
    const token = req.cookies.token;
    if(!token){
        return successRes(false, 'please login first', 403, res);
    }

    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.DATABASE_URL);
    }
    
    const dcrypt = await verify(token, process.env.JWT_SECRET);
    const user = await Admin.findById(dcrypt._id).select('+username');
    if(!user){
        return successRes(false, 'invalid token', 403, res);
    }
    req.user = user;
    return fucn(req,res);
} 

export const isAuth2 = async (func,req,res) =>
{
    const token = req.cookies.token;
    if(!token){
        return successRes(false, 'please login first', 403, res);
    }
    const dcrypt = await verify(token, process.env.JWT_SECRET);
    const user = await Admin.findById(dcrypt._id).select('+username');
    if(!user){
        return successRes(false, 'invalid token', 403, res);
    }
    req.user = user;
    return func(req,res);
}