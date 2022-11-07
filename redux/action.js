import axios from 'axios';

const api = axios.create({
	baseURL: '/api/v1',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const loginAdmin = (username, password, token) => async (dispatch) => {
	try{
		dispatch({type: 'loginAdminReq'});
		const {data} = await api.post('/admin',{username,password, token});
		dispatch({type: 'loginAdminSuc',payload: data});
	}catch(err){
		dispatch({type: 'loginAdminFail',payload: err.response.data.message});
	}
}

export const loadAdmin = () => async (dispatch) => {
	try{
		dispatch({type: 'loadAdminReq'});
		const {data} = await api.get('/admin');
		dispatch({type: 'loadAdminSuc',payload: data.admin});
	}catch(err){
		dispatch({type: 'loadAdminFail'});
	}
}

export const getPost = () => async (dispatch) => {
	try{

		dispatch({type: 'getPostsReq'});
		const {data} = await api.get('/post');
		dispatch({type: 'getPostsSuc',payload: data.posts});
	}catch(err){
		dispatch({type: 'getPostsFail',payload: err.response.data.message});
	}
}

export const addPost = (title,category,image,content,slug,shorDiscreption) => async (dispatch) => {
	try{

		dispatch({type: 'addPostsReq'});
		const {data} = await api.post('/post',{title,category,image,content,slug,shorDiscreption});
		dispatch({type: 'addPostsSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'addPostsFail',payload: err.response.data.message});
	}
}

export const updatePost = (id,title,category,image,content,slug,shorDiscreption) => async (dispatch) => {
	try{

		dispatch({type: 'updatePostsReq'});
		const {data} = await api.put(`/post?postID=${id}`,{title,category,image,content,slug,shorDiscreption});
		dispatch({type: 'updatePostsSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'updatePostsFail',payload: err.response.data.message});
	}
}

export const deletePost = (id) => async (dispatch) => {
	try{

		dispatch({type: 'deletePostsReq'});
		const {data} = await api.delete(`/post?postID=${id}`);
		dispatch({type: 'deletePostsSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'deletePostsFail',payload: err.response.data.message});
	}
}


export const getPostDetail = (id) => async (dispatch) => {
	try{
		dispatch({type: 'detailPostsReq'});
		const {data} = await api.get(`/getpostdetail?postID=${id}`);
		dispatch({type: 'detailPostsSuc',payload: data.post});
	}catch(err){
		dispatch({type: 'detailPostsFail',payload: err.response.data.message});
	}
}


export const updateAdmin = (name,username,email,avatar) => async (dispatch) => {
	try{
		dispatch({type: 'updateAdminReq'});
		const {data} = await api.put(`/admin`,{name,username,email,avatar});
		dispatch({type: 'updateAdminSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'updateAdminFail',payload: err.response.data.message});
	}
}

export const changeAdminPass = (oldPassword,newPassword) => async (dispatch) => {
	try{
		dispatch({type: 'changeAdminPassReq'});
		const {data} = await api.patch(`/admin`,{oldPassword, newPassword});
		dispatch({type: 'changeAdminPassSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'changeAdminPassFail',payload: err.response.data.message});
	}
}

export const logoutAdmin = () => async (dispatch) => {
	try{
		dispatch({type: 'logoutAdminReq'});
		const {data} = await api.delete(`/admin`);
		dispatch({type: 'logoutAdminSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'logoutAdminFail',payload: err.response.data.message});
	}
}


export const forgotPassword = (email, token) => async (dispatch) => {
	try{
		dispatch({type: 'forgotReq'});
		const {data} = await api.post(`/forgotpassword`,{email, token});
		dispatch({type: 'forgotSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'forgotFail',payload: err.response.data.message});
	}
}

export const resetPassword = (newPassword,token, reCaptcha) => async (dispatch) => {
	try{
		dispatch({type: 'resetReq'});
		const {data} = await api.put(`/resetpassword`,{newPassword,token, reCaptcha});
		dispatch({type: 'resetSuc',payload: data.message});
	}catch(err){
		dispatch({type: 'resetFail',payload: err.response.data.message});
	}
}

export const message = async (name,email,subject,message) => {
	try{
		await axios.post('https://formspree.io/f/maykldjy',{name,email,subject,message});
		return 'message send successfully';
	}catch(err){
		return 'message send unsuccessfully';
	}
}