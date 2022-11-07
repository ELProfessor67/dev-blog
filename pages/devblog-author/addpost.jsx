import {useSelector, useDispatch} from 'react-redux';
import Error from 'next/error';
import Sidebar from '../../components/dashboard/Sidebar';
import Loading from '../../components/loading';
import {useState} from 'react';
import {addPost} from '../../redux/action';
import {AiOutlineReload, AiOutlineClose} from 'react-icons/ai';
import {VscOutput} from 'react-icons/vsc';
import { Dialog, Box} from "@mui/material";
import {serialize} from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import Image from 'next/image';
import Head from 'next/head';

import style from '../../styles/addpost.module.scss';
import 'highlight.js/styles/atom-one-dark.css';

function YouTube({ id }) {
  return (
    <div className={style.youtubecontainer}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className={style.frame}
      />
    </div>
  );
}

function Ima({ src }) {
  return (<Image src={src} width={1703} height={980} alt="image"/>);
}

export default function Addpost({theme, setTheme}){
	const {isAdmin, loading} = useSelector(state => state.auth);

	const [image, setImage] = useState(null);
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [shotDiscription, setSortDiscription] = useState('');
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('');
	const [autoSlug, setAutoSlug] = useState(false);
	const [open, setOpen] = useState(false);
	const [source, setSource] = useState();

	const mdx = async () => {
		const source = await serialize(content, {
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight
                ]
            }
        });

        return source;
	}

	const handleSource = async () => {
		const src = await mdx();
		setSource(src);
		setOpen(true);
	}

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(addPost(title,category,image,content,slug,shotDiscription));
	}

	const handleImage = (e) => {
		const [file] = e.target.files;
		if(!file){
			return
		}
		const reader = new FileReader();
		reader.onload = () => {
			if(reader.readyState === 2){
				setImage(reader.result);
			}
		}
		reader.readAsDataURL(file);
	}

	const handleSlug = () => {
		setAutoSlug(true);
		setSlug(title.replace(/ /g,'-'));
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
		        <title>Add Post --devblog.com</title>
		      </Head>
					<Sidebar theme={theme} setTheme={setTheme}/>
					<div className={style.section_addpost}>
						<div className={style.container}>
						 <div className={style.form_container}>
						 	<h1 className={style.heading}>Add Post</h1>
						 	<form onSubmit={submitHandler}>
						 		<div className={style.input_field}>
						 			<label htmlFor='title'>Title</label>
						 			<input type='text' placeholder='Title' id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
						 		</div>
						 		<div className={style.input_field}>						 			
							 		<label htmlFor='slug'>Slug</label>
							 		<div className={style.slug} onMouseLeave={() => setAutoSlug(false)}>
							 			<input type='text' placeholder='Slug' id='slug' name='slug' value={slug} onChange={(e) => setSlug(e.target.value)} required/>
						 				<span onClick={handleSlug} style={{transform: `rotate(${autoSlug ? 180 : 0}deg)`}}><AiOutlineReload/></span>
						 			</div>
						 		</div>
						 		<div className={style.input_field}>
						 			<label htmlFor='category'>Category</label>
						 			<select id="category" className={style.category} value={category} onChange={(e) => setCategory(e.target.value)}>
										<option value="">Choose Category</option>
										<option value="cyber security">cyber security</option>
										<option value="web development">web development</option>
										<option value="programming">programming</option>
										<option value="news">news</option>
									</select>
						 		</div>
						 		<div className={style.input_field}>
						 			<label htmlFor='shotdescription'>Shot Description</label>
						 			<textarea type='text' placeholder='Shot description' id='shotdescription' value={shotDiscription} onChange={(e) => setSortDiscription(e.target.value)} className={style.shotdes} name='shotdescription' required/>
						 		</div>
						 		<div className={style.input_field}>
						 			<label htmlFor='content'>Content</label>
						 			<div className={style.content}>
						 				<textarea type='text' placeholder='Content' id='content' className={style.content} name='content' value={content} onChange={(e) => setContent(e.target.value)} required/>
						 				{content &&
						 					<span onClick={handleSource}><VscOutput/></span>
						 				}
						 			</div>
						 		</div>
						 		<div className={style.input_field}>
						 			<label htmlFor='image'></label>
						 			<input type='file' id='image' className={style.image} name='image' onChange={handleImage} required/>
						 		</div>
						 		{
						 			image &&
						 			<div className={style.input_field}>
							 			<img src={image} alt='image' className={style.output_images}/>
							 		</div>
						 		}
						 		<div className={style.input_field}>
						 			<button type='submit' className={style.btn}>Submit</button>
						 		</div>
						 	</form>
						 </div>
						</div>
					</div>
					<Dialog
			          open={open}
			          onClose={() => setOpen(false)}
			          className={style.diaglog_box}
			        >
			        <Box className={style.box}>
			        	<div className={style.close}>
				        	<span onClick={() => setOpen(false)}><AiOutlineClose/></span>
				        </div>
				        <div className={style.container}>
				        	{
				        		open &&
				        		<MDXRemote {...source} components={{ YouTube, Ima }}/>
				        	}
				        </div>
			        </Box>
			        </Dialog>
				</>
			);
	}
}