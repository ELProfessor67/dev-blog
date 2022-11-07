import SideBar from './Sidebar';
import style from '../../styles/dashboard.module.scss';
import { Bar, Doughnut } from 'react-chartjs-2';
import {useSelector, useDispatch} from 'react-redux';
import {getPost} from '../../redux/action';
import {useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';


export default function Dashboard({theme, setTheme}){
	const labels = ['Posts'];
	const {posts} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!posts){
			dispatch(getPost());
		}
	},[]);

	ChartJS.register(
	  CategoryScale,
	  LinearScale,
	  BarElement,
	  Title,
	  Tooltip,
	  Legend,
	  ArcElement
	);

	const options = {
	  responsive: true,
	  plugins: {
	    legend: {
	      position: 'top',
	    },
	    title: {
	      display: true,
	      text: 'All section Graph',
	    },
	  },
	};

	const data = {
	  labels,
	  datasets: [
	    {
	      label: 'Posts',
	      data: [posts && posts.length],
	      backgroundColor: [
	        'rgba(255, 99, 132, 0.2)',
	      ],
	      borderColor: [
	        'rgba(255, 99, 132, 1)',
	      ],
	      borderWidth: 1,
	    },
	  ],
	};

	return(
		<>
			<SideBar theme={theme} setTheme={setTheme}/>
			<div className={style.section_dashboard}>
					<div className={style.container}>
						<h1 className={style.heading}>Dashboard</h1>
						<div className={style.bar_doughnut}>
							<Doughnut data={data} />
						</div>
					</div>
			</div>
		</>
		);
}