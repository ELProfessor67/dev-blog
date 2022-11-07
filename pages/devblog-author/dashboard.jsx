import style from '../../styles/login.module.scss';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginAdmin} from '../../redux/action';
import DashboardComponents from '../../components/dashboard/Dashboard';
import Loading from '../../components/loading';
import Link from 'next/link';
import {toast} from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import Head from 'next/head';

import {FaUserAlt} from 'react-icons/fa';

export default function Dashboard({theme, setTheme}){
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');

	const dispatch = useDispatch();
	const {isAdmin, loading, error, message } = useSelector(state => state.auth);

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
		if(!username || !password){
			toast.error('please fill all field', {
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
		
		dispatch(loginAdmin(username, password, token));
	}
	if(loading){
		return(
				<>
					<Loading/>
				</>
			)

	}else if(!isAdmin){
		return(
			<>
				<Head>
		        	<title>Login --devblog.com</title>
		      	</Head>
				<div className={style.section_login}>
					<div className={style.container}>
						<div className={style.login_box}>
							<div className={style.logo}>
								<span><FaUserAlt/></span>
							</div>
							<form onSubmit={submitHandler}>
								<div className={style.input_field}>
									<label htmlFor='username'>Username : </label>
									<input type='text' placeholder='Enter your username' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="false" required/>
								</div>
								<div className={style.input_field}>
									<label htmlFor='password'>Password : </label>
									<input type='password' placeholder='Enter your password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="false" required/>
								</div>
								<div  className={style.input_field} style={{alignItems: 'center'}}>
									<ReCAPTCHA
									    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
									    onChange={(value) => setToken(value)}
									    width={'100%'}
									  />
								</div>
								<div className={style.btn}>
									<button type='submit'>Login</button>
								</div>
								<div className={style.btn} style={{fontSize: '1.5rem', marginTop: '2rem'}}>
									<Link href='/devblog-author/forgot'>Forgot Password ?</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
			)
	}else{
		return(
			<>
				<Head>
		        	<title>Dashboard --devblog.com</title>
		      	</Head>
				<DashboardComponents setTheme={setTheme} theme={theme}/>
			</>
	);
	}
}