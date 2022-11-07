import catchasyncError from '../../../middleware/catchasyncError';
import {addPost, deletePost, getPost, updatePost} from '../../../controller/post';
import {isAuth} from '../../../middleware/isAuth';
import cloudinary from 'cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

// connect cloudinary
cloudinary.config({ 
  cloud_name : process.env.CLOUDNARY_NAME, 
  api_key : process.env.CLOUDNARY_KEY, 
  api_secret : process.env.CLOUDNARY_SECRET
});

const handler =  catchasyncError(async function (req, res) {
  if(req.method === 'POST'){
    return addPost(req,res);
  }else if(req.method === 'PUT'){
    return updatePost(req,res);
  }else if(req.method === 'DELETE'){
    return deletePost(req,res);
  }else if(req.method === 'GET'){
    return getPost(req,res);
  }else{
    res.send(`cannot ${req.method} ${req.url}`);
  }
});

export default isAuth(handler);
// export default handler;