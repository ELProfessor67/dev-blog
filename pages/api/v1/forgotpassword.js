import crypto from 'crypto';
import Admin from '../../../models/admin';
import catchAsyncError from '../../../middleware/catchasyncError';
import successRes from '../../../utils/successRes';
import mailer from '../../../middleware/mailer';

const genrateResetToken = async (user) => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetDate = Date.now() + 10 * 60 * 1000;
    user.passwordResetExpire = resetDate;
    return resetToken;
}

const handler = catchAsyncError(async (req,res) => {
	if(req.method !== 'POST'){
		res.status(404).send(`cannot ${req.method} ${req.url}`);
	}

	const {email} = req.body;

	if(!email){
		return successRes(false,'please enter your emial',403,res);
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

	const admin = await Admin.findOne({email});

	if(!admin){
		return successRes(false,'user not exist',404,res);
	}

	const resetToken = await genrateResetToken(admin);
	await admin.save();

	const resetUrl = `${req.headers.origin}/devblog-author/forgot/${resetToken}`;
	const subject = 'devblog password reset token';
    const text = `your password reset url is \n ${resetUrl}`;
    try{
    	const send = await mailer(email,subject,text);
    	if(!send){
    		admin.passwordResetToken = undefined;
    		admin.passwordResetExpire = undefined;
    		await admin.save();
            return successRes(false, "mail sending failed please try again", 501, res);
        }

        return successRes(true,'Password reset link send successfully on yout email', 200, res);

    }catch(err){
    	admin.passwordResetToken = undefined;
    	admin.passwordResetExpire = undefined;
    	await admin.save();
        return successRes(false, err.message, 501, res);
    }

});


export default handler;