import sendError from "./sendError";
import mongoose from 'mongoose';

const CatchAsyncError = (func) => async (req,res) => {
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.DATABASE_URL);
    }
    console.log('connection',mongoose.connections[0].readyState);

    Promise.resolve(func(req,res)).catch((err) => sendError(err,req,res));
}

export default CatchAsyncError;