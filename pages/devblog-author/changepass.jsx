import {useSelector, useDispatch} from 'react-redux';
import Error from 'next/error';
import Sidebar from '../../components/dashboard/Sidebar';
import Loading from '../../components/loading';
import {changeAdminPass} from '../../redux/action';
import {useState} from 'react';
import {toast} from 'react-toastify';
import Head from 'next/head';

import style from '../../styles/chanagepass.module.scss';

export default function Allpost({theme, setTheme}){
	const {isAdmin, loading} = useSelector(state => state.auth);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [conPassword, setConPassword] = useState('');
	const dispatch = useDispatch();

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
		dispatch(changeAdminPass(oldPassword,newPassword));
	}

	if(loading){
		return <Loading/>
	}
	if(!isAdmin){
		return <Error statusCode={404}/>
	}else{
		return(
				<>
					<Head>
				        <title>Change Password --devblog.com</title>
				    </Head>
					<Sidebar theme={theme} setTheme={setTheme}/>
					<div className={style.section_change_pass}>
						<div className={style.container}>
							<div className={style.form_container}>
							 	<h1 className={style.heading}>Settings</h1>
							 	<form onSubmit={submitHandler}>
							 		<div className={style.input_field}>
							 			<label htmlFor='oldpass'>Old Password</label>
							 			<input type='text' placeholder='Old password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} id='oldpass' name='oldpass'/>
							 		</div>
							 		<div className={style.input_field}>
							 			<label htmlFor='newpass'>New Password</label>
							 			<input type='text' placeholder='New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id='newpass' name='newpass'/>
							 		</div>
							 		<div className={style.input_field}>
							 			<label htmlFor='conpass'>Confirm Password</label>
							 			<input type='text' placeholder='Confirm password' value={conPassword} onChange={(e) => setConPassword(e.target.value)} id='conpass' name='conpass'/>
							 		</div>
							 		<div className={style.input_field}>
							 			<button type='submit' className={style.btn}>Submit</button>
							 		</div>
							 	</form>
							</div>
						</div>
					</div>
				</>
			);
	}
}