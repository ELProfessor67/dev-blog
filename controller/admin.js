import Admin from '../models/admin';
import successRes from '../utils/successRes';
import {jwtToken, passwordMatch} from '../utils/methods';
import { serialize } from 'cookie';
import cloudinary from 'cloudinary';

// export const addAdmin = async (req,res) => {
//     req.body.avatar = {
//         public_id: 'public_id',
//         url: '/images/hero.png'
//     }

//     const admin = await Admin.create(req.body);

//     res.status(201).json({
//         success: true,
//         message: 'admin create successfully',
//         admin
//     });
// }


// login admin 

export const adminLogin = async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return successRes(false, 'please fill all field', 403, res);
    }

    // check google recaptcha token
    if(!req.body.token){
        return successRes(false, 'please fill the google recaptcha', 403, res);
    }

    // checking rechaptcha token valid or not
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${req.body.token}`;
    let recaptchares = await fetch(url,{method : "POST"});
    recaptchares = await recaptchares.json();
    if(!recaptchares.success){
        return successRes(false, 'Invalid google recaptcha token', 403, res);
    }
    
    const admin = await Admin.findOne({username}).select('+password').select('+username');
    
    if(!admin){
        return successRes(false, 'invalid details', 403, res);
    }
    
    const isMatch = await passwordMatch(password, admin.password);

    if(!isMatch){
        return successRes(false, 'invalid details', 403, res);
    }

    const token = await jwtToken(admin._id);
    const option = {
        expires: new Date(Date.now() + Number(process.env.TOKEN_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    
    res.setHeader("Set-Cookie",serialize('token',token,option));
    res.status(200).json({
        success: true,
        message: 'login successfully',
        admin
    })
}


// get admin 
export const loadAdmin = async (req,res) => {
    if(!req.user){
        return successRes(false, 'only admin have access' ,403, res);
    }
    res.status(200).json({
        success: true,
        admin: req.user
    })
}

// update admin 

export const updateAdmin = async (req,res) => {
    if(!req.user){
        return successRes(false, 'only admin have access' ,403, res);
    }

    const admin = await Admin.findById(req.user._id);

    const allowtoUpdate = new Set(['name','username','avatar','email']);

    //delete empty value
    Object.keys(req.body).forEach((key) => {
        if(req.body[key] === '' || req.body[key] === ' ' || req.body[key] === '  ' || req.body[key] === '   ' || !allowtoUpdate.has(key)){
            delete req.body[key]
        }
    });
    console.log(req.body.avatar);
    if(req.body.avatar && req.body.avatar.toString().includes('data:image/') && req.body.avatar.toString().includes(';base64,')){
        // delete old image from cloudnary
        await cloudinary.v2.uploader.destroy(admin.avatar.public_id);

        //upload new image from cloudanry
        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatar'
        });
        
        req.body.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }else{
        delete req.body.avatar;
    }

    // update fields
    Object.keys(req.body).forEach((key) => {
        admin[key] = req.body[key];
    });

    await admin.save();

    successRes(true, 'Update successfully', 200, res);
}


// change admin password 

export const changePassword = async (req,res) => {
    if(!req.user){
        return successRes(false, 'only admin have access' ,403, res);
    }

    const {oldPassword, newPassword} = req.body;

    const admin = await Admin.findById(req.user._id).select('+password');

    const isMatch = await passwordMatch(oldPassword, admin.password);

    if(!isMatch){
        return successRes(false, 'invalid Old passwors', 403, res);
    }

    admin.password = newPassword;
    await admin.save();

    successRes(true, 'password change succesfully', 200, res);
}


// logout admin 
export const logoutAdmin = async (req, res) => {
    if(!req.user){
        return successRes(false, 'only admin have access' ,403, res);
    }
    
    const option = {
        expires: new Date(Date.now()),
        httpOnly: true
    }

    res.setHeader("Set-Cookie",serialize('token',null,option));

    successRes(true, 'logout successfully', 200, res);
}