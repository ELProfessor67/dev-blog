import catchAsyncError from '../../../middleware/catchasyncError';
import Post from '../../../models/post';
import successRes from '../../../utils/successRes';
import {isAuth} from '../../../middleware/isAuth';

const handler = catchAsyncError(async (req,res) => {
    if(req.method !== 'GET'){ 
        return res.status(404).send(`cannot ${req.method} ${req.url}`);
    }

    const id = req.query.postID;

    if(!id){
    	return res.status(404).send(`cannot ${req.method} ${req.url}`);
    }

    const post = await Post.findById(id);

    if(!post){
    	return successRes(false,'please enter valid Id',403,res);
    }

    res.status(200).json({
    	success: true,
    	post
    });


});

export default isAuth(handler);