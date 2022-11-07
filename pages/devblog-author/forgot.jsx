import style from '../../styles/forgot.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import Error from 'next/error';
import Link from 'next/link';
import Loading from '../../components/loading';
import {forgotPassword} from '../../redux/action';
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import Head from 'next/head';

export default function Forgot(){
	const {isAdmin, loading, error, message} = useSelector(state => state.auth);
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');
	const dispatch = useDispatch();
    
    const submitHandler = (e) => {
    	e.preventDefault();
    	if(!token){
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

    	dispatch(forgotPassword(email, token));
    }

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

    if(isAdmin){
		return <Error statusCode={404}/>
	}

	if(loading){
		return <Loading/>
	}	

	return(
		<>
			<Head>
		        <title>Forgot Password --devblog.com</title>
		    </Head>
			<div className={style.section_forgotpass}>
				<div className={style.container}>
					<div className={style.form_container}>
						<h1 className={style.heading}>Forgot Password</h1>
							<form onSubmit={submitHandler}>
								<div className={style.input_field}>
							 		<label htmlFor='email'>Email</label>
							 		<input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' name='email'/>
							 	</div>
							 	<div  className={style.input_field} style={{alignItems: 'center'}}>
									<ReCAPTCHA
									    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
									    onChange={(value) => setToken(value)}
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
		)
}