import successRes from '../../../utils/successRes';
import catchAsyncError from '../../../middleware/catchasyncError';
import Admin from '../../../models/admin';
import crypto from 'crypto';

const handler = catchAsyncError(async(req,res) => {
	if(req.method !== 'PUT'){
		return res.status(404).send(`cannot ${req.method} ${req.url}`);
	}

	const {token,newPassword, reCaptcha} = req.body;

	// check google recaptcha token
    if(!reCaptcha){
        return successRes(false, 'please fill the google recaptcha', 403, res);
    }

    // checking rechaptcha token valid or not
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${reCaptcha}`;
    let recaptchares = await fetch(url,{method : "POST"});
    recaptchares = await recaptchares.json();
    if(!recaptchares.success){
        return successRes(false, 'Invalid google recaptcha token', 403, res);
    }

	if(!token){
		return successRes(false,'please enter your token', 403, res);
	}

	const encryptToken = crypto.createHash('sha256').update(req.body.token).digest('hex');
    const admin = await Admin.findOne({passwordResetToken: encryptToken,passwordResetExpire: {$gt: Date.now()}});


    if(!admin){
    	return successRes(false,'invalid token or token has been expire',403,res);
    }

    if(!newPassword){
    	return successRes(false,'please fill new password',403,res);
    }

    admin.password = newPassword;
    admin.passwordResetToken = undefined;
    admin.passwordResetExpire = undefined;
    await admin.save();

    successRes(true,'password reset successfully',200,res);
});

export default handler;