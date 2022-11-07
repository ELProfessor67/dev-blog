import style from '../../styles/sidebar.module.scss';
import Link from 'next/link';
import {useState} from 'react';
import {IoMdClose} from 'react-icons/io';
import {FiMenu} from 'react-icons/fi';
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs';
import Avatar from '@mui/material/Avatar';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {logoutAdmin, loadAdmin} from '../../redux/action';

export default function Sidebar({theme, setTheme}){
	const [sidebarAc, setSidebarAc] = useState(false);
	const dispatch = useDispatch();
	const {admin} = useSelector(state => state.auth);

	const router = useRouter();

	const handleLogout = async () => {
		router.push('/');
		dispatch(logoutAdmin());
	}
	
	return(
		<>
			<>
				<style global='true'>{`
					header
					{
						display: none;
					}
			`}</style>
			<div className={style.sidebar}>
				<div className={style.button}>
					<div className={style.menu}>
						{
			                sidebarAc ?
			                <IoMdClose onClick={() => setSidebarAc(!sidebarAc)}/> :
			                <FiMenu onClick={() => setSidebarAc(!sidebarAc)}/>
			            }
					</div>
					<button onClick={() => theme === 'light-theme' ? setTheme('dark-theme') : setTheme('light-theme')}>
			            {
			                theme === 'light-theme'?
			                <BsFillSunFill/>:
			                <BsFillMoonFill/>
			            }
			        </button>
				</div>
				<nav className={sidebarAc && style.active}>
					<ul>
						<li>
							<Link href='/devblog-author/dashboard/'>Dashboard</Link>
						</li>
						<li>
							<Link href='/devblog-author/allpost/'>All Post</Link>
						</li>
						<li>
							<Link href='/devblog-author/addpost/'>Add Post</Link>
						</li>
						<li>
							<Link href='/devblog-author/setting/'>Settings</Link>
						</li>
						<li>
							<Link href='/devblog-author/changepass/'>Change Password</Link>
						</li>
						<li>
							<Link href='/'>Home</Link>
						</li>
						<li>
							<a onClick={() => handleLogout()}>Logout</a>
						</li>
					</ul>
				</nav>

				<div className={style.avatar}>
					<Avatar src={admin.avatar.url} sx={{width: '5rem', height: '5rem'}} onClick={() => router.push('/devblog-author/setting')} style={{cursor: 'pointer'}}/>
					<div className={style.name}>
						<p>Hii 👋 </p>
						<h3>{admin.name}</h3>
					</div>
				</div>
			</div>
			</>
		</>
		);
}