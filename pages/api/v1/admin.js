import { addAdmin, adminLogin, changePassword, loadAdmin, logoutAdmin, updateAdmin } from '../../../controller/admin';
import catchAsyncError from '../../../middleware/catchasyncError';
import {isAuth2} from '../../../middleware/isAuth';
import cloudinary from 'cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
}

// connect cloudinary
cloudinary.config({ 
  cloud_name : process.env.CLOUDNARY_NAME, 
  api_key : process.env.CLOUDNARY_KEY, 
  api_secret : process.env.CLOUDNARY_SECRET
});


const handler = catchAsyncError(async (req,res) => {
    if(req.method === 'GET'){
        return isAuth2(loadAdmin,req,res);
    }else if(req.method === 'POST'){
        return adminLogin(req,res);
    }else if(req.method === 'PUT'){
        return isAuth2(updateAdmin,req,res);
    }else if(req.method === 'PATCH'){
        return isAuth2(changePassword,req,res);
    }else if(req.method === 'DELETE'){
        return isAuth2(logoutAdmin,req,res);
    }else{
        res.status(404).send(`cannot ${req.method} ${req.url}`);
    }
});

export default handler;