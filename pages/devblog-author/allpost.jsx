import {useSelector, useDispatch} from 'react-redux';
import Error from 'next/error';
import Sidebar from '../../components/dashboard/Sidebar';
import Loading from '../../components/loading';
import { DataGrid } from '@mui/x-data-grid';
import {getPost, deletePost} from '../../redux/action';
import {useEffect, Fragment} from 'react';
import Button from '@mui/material/Button';
import {MdModeEdit, MdDelete} from 'react-icons/md';
import {useRouter} from 'next/router';
import Head from 'next/head';

import style from '../../styles/allpost.module.scss';

export default function Allpost({theme, setTheme}){
	const {isAdmin, loading, posts} = useSelector(state => state.auth);

	const router = useRouter();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPost());
	},[]);

	const handlerUpdatePost = (id) => {
		router.push(`/devblog-author/allpost/${id}`);
	}

	const handlerDeletePost = async (id) => {
		console.log(id);
		await dispatch(deletePost(id));
		dispatch(getPost());
	}

	const columns = [
		{ field: "id", headerName: "ID", minWidth: 50, flex: 0.5 },
	    { field: "date", headerName: "Date", minWidth: 100, flex: 0.5 },

	    {
	      field: "title",
	      headerName: "Title",
	      minWidth: 200,
	      flex: 1,
	    },

	    {
	      field: "category",
	      headerName: "Category",
	      // type: "number",
	      minWidth: 150,
	      flex: 0.5,
	    },

	    {
	      field: "actions",
	      flex: 0.3,
	      headerName: "Actions",
	      minWidth: 150,
	      sortable: false,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<Button className={style.edit_btn} onClick={() => handlerUpdatePost(params.row.actions)}>
	            	<MdModeEdit />
	            </Button>
	            <Button className={style.delete_btn} onClick={() => handlerDeletePost(params.row.actions)}>
	            	<MdDelete />
	            </Button>
	          </Fragment>
	          );
	      },
	    },
	  ];

	  const rows = [];

	  posts && posts.length > 0 &&
	    posts.forEach(({title,createdAt,category,_id},i) => {
	      rows.push({
	      	id: i+1,
	        date: new Date(createdAt).toLocaleDateString(),
	        title: title,
	        category: category,
	        actions: _id
	      });
	    })

	if(loading){
		return <Loading/>
	}
	if(!isAdmin){
		return <Error statusCode={404}/>
	}else{
		return(
				<>
					<Head>
				        <title>All Posts --devblog.com</title>
				    </Head>
					<Sidebar theme={theme} setTheme={setTheme}/>
					<div className={style.section_allpost}>
						<div className={style.container}>
							<h1 className={style.heading}>All Post</h1>
							<div className={style.data_container}>
								<DataGrid
							        rows={rows}
							        columns={columns}
							        pageSize={10}
							        disableSelectionOnClick
							        className="productListTable"
							        autoHeight
							    />
							</div>
						</div>
					</div>
				</>
			);
	}
}