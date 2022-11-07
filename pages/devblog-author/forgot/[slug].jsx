import style from '../../../styles/forgot.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import Error from 'next/error';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Loading from '../../../components/loading';
import {resetPassword} from '../../../redux/action';
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import Head from 'next/head';

export default function ResetPassword(){
	const {isAdmin, loading, error,message} = useSelector(state => state.auth);

	const router = useRouter();
	const {slug} = router.query;
	const dispatch = useDispatch();
	const [newPassword, setNewPassword] = useState('');
	const [conPassword, setConPassword] = useState('');
	const [reCaptcha, setReCaptcha] = useState('');

	useEffect(() => {
        if(error){
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
            dispatch({type: 'clearError'});
        }

        if(message){
            toast.success(message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
            dispatch({type: 'clearMessage'});
        }
    },[error,message]);

	const submitHandler = (e) => {
		e.preventDefault();
		if(newPassword !== conPassword){
			toast.error('confirm password and new password does not match', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
			return
		}

		if(newPassword.length < 8){
			toast.error('password must be 8 corrector', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
			return
		}

		const specialChar = /[~`!@#$%^&*(){}[\]\'\/\"\?\:\;\,.\<\>\|\\=\+\-\_]/g;
		const upper = /[A-Z]/g;
		const digit = /[0-9]/g;

		if(!newPassword.match(specialChar) || !newPassword.match(upper) || !newPassword.match(digit)){
			toast.error('password must be at least one special character one capital letter one digit', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
			return
		}

		if(!reCaptcha){
			toast.error('please fill ReCAPTCHA', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
            return
		}

		dispatch(resetPassword(newPassword,slug, reCaptcha));
	}


	if(isAdmin){
		return <Error statusCode={404}/>
	}

	if(loading){
		return <Loading/>
	}

	return(
			<>
				<Head>
			        <title>Reste Password --devblog.com</title>
			    </Head>
				<div className={style.section_forgotpass}>
					<div className={style.container}>
						<div className={style.form_container}>
							<h1 className={style.heading}>Reset Password</h1>
								<form onSubmit={submitHandler}>
									<div className={style.input_field}>
								 		<label htmlFor='newpass'>New Password</label>
								 		<input type='text' placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id='newpass' name='newpass'/>
								 	</div>
								 	<div className={style.input_field}>
								 		<label htmlFor='conpass'>Confirm Password</label>
								 		<input type='text' placeholder='Confirm Password' value={conPassword} onChange={(e) => setConPassword(e.target.value)} id='conpass' name='conpass'/>
								 	</div>
								 	<div  className={style.input_field} style={{alignItems: 'center'}}>
										<ReCAPTCHA
										    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
										    onChange={(value) => setReCaptcha(value)}
										    width={'100%'}
										  />
									</div>
								 	<div className={style.input_field}>
								 		<button type='submit' className={style.btn}>Submit</button>
								 	</div>
								 	<div className={style.forgot} style={{fontSize: '1.5rem', marginTop: '2rem', textAlign: 'center'}}>
										<Link href='/devblog-author/dashboard' >Log In ?</Link>
									</div>
								</form>
						</div>
					</div>
				</div>
			</>
		);
}