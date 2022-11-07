import style from '../styles/loadin.module.scss';

export default function Loading(){
	const box = [1,2,3,4,5,6,7];
	return(
			<>
				<section className={style.section_loader}>
					<div className={style.loader}>
					</div>
				</section>
			</>
		);
}