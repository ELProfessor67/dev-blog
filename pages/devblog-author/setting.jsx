import {useSelector, useDispatch} from 'react-redux';
import Error from 'next/error';
import Sidebar from '../../components/dashboard/Sidebar';
import Loading from '../../components/loading';
import Avatar from '@mui/material/Avatar';
import {MdModeEdit} from 'react-icons/md';
import {useState, useEffect} from 'react';
import {updateAdmin, loadAdmin} from '../../redux/action';
import Head from 'next/head';

import style from '../../styles/setting.module.scss';

export default function Allpost({theme, setTheme}){
	const {isAdmin, loading, admin} = useSelector(state => state.auth);
	const [name, setName] = useState();
	const [username, setUsername] = useState();
	const [avatar, setAvatar] = useState();
	const [email, setEmail] = useState();
	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();
		await dispatch(updateAdmin(name,username,email,avatar));
		dispatch(loadAdmin());
	}

	useEffect(() => {
		if(admin){
			setName(admin.name);
			setUsername(admin.username);
			setAvatar(admin.avatar.url);
			setEmail(admin.email);
		}
	},[admin]);

	const avatarHandler = (e) => {
		const [file] = e.target.files;
		if(!file){
			return
		}

		const reader = new FileReader();
		reader.onload = () => {
			if(reader.readyState === 2){
				setAvatar(reader.result);
			}
		}
		reader.readAsDataURL(file);
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
				        <title>Settings --devblog.com</title>
				    </Head>
					<Sidebar theme={theme} setTheme={setTheme}/>
					<div className={style.section_settings}>
						<div className={style.container}>
							<div className={style.form_container}>
							 	<h1 className={style.heading}>Settings</h1>
							 	<form onSubmit={submitHandler}>
							 		<div className={style.avatar}>
							 			<Avatar src={avatar ?? null} sx={{width: '10rem', height: '10rem'}}/>
							 			<label htmlFor='avatar'><span><MdModeEdit/></span></label>
							 		</div>
							 		<div className={style.input_field}>
							 			<label htmlFor='name'>Name</label>
							 			<input type='text' placeholder='Name' id='name' value={name} onChange={(e) => setName(e.target.value)} name='name'/>
							 		</div>
							 		<div className={style.input_field}>
							 			<label htmlFor='username'>Username</label>
							 			<input type='text' placeholder='Username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} name='username'/>
							 		</div>
							 		<div className={style.input_field}>
							 			<label htmlFor='email'>Email</label>
							 			<input type='email' placeholder='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email'/>
							 		</div>
							 		<input type='file' style={{display: 'none'}} id='avatar' onChange={avatarHandler}/>
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