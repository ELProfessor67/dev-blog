import style from '../styles/preloader.module.scss';
import Image from 'next/image';

export default function Preloader(){
	return(
			<>
				<div className={style.container}>
				 <div>
				 	<Image src='/images/Devblog.png' width={500} height={500} alt='logo'/>
				 	<h2>Loading</h2>
				 </div>
				</div>
			</>
		)
}