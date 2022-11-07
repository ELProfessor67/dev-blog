import { createReducer } from "@reduxjs/toolkit";

export const auth = createReducer({},{

    // load admin
    loadAdminReq: (state) => {
        state.loading = true;
    },
    loadAdminSuc: (state, action) => {
        state.loading = false;
        state.isAdmin = true;
        state.admin = action.payload;
    },
    loadAdminFail: (state) => {
        state.loading = false;
        state.isAdmin = false;
    },

    // login admin 
    loginAdminReq:(state) => {
    	state.loading = true;
    },
    loginAdminSuc:(state, action) => {
    	state.loading = false;
    	state.isAdmin = true;
    	state.admin = action.payload.admin;
    	state.message = action.payload.message;
    },
    loginAdminFail: (state, action) => {
    	state.loading = false;
    	state.isAdmin = false;
    	state.error = action.payload;
    },

    // get posts
    getPostsReq:(state) => {
        state.loading = true;
    },
    getPostsSuc: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getPostsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // add posts
    addPostsReq:(state) => {
        state.loading = true;
    },
    addPostsSuc: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addPostsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // update posts
    updatePostsReq:(state) => {
        state.loading = true;
    },
    updatePostsSuc: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updatePostsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    // delete post
    deletePostsReq:(state) => {
        state.loading = true;
    },
    deletePostsSuc: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // get post detail
    detailPostsReq:(state) => {
        state.loading = true;
    },
    detailPostsSuc: (state, action) => {
        state.loading = false;
        state.singlePost = action.payload;
    },
    detailPostsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // update Admin
    updateAdminReq:(state) => {
        state.loading = true;
    },
    updateAdminSuc: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateAdminFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // change password Admin
    changeAdminPassReq:(state) => {
        state.loading = true;
    },
    changeAdminPassSuc: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    changeAdminPassFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    //  logout Admin
    logoutAdminReq:(state) => {
        state.loading = true;
    },
    logoutAdminSuc: (state, action) => {
        state.loading = false;
        state.isAdmin = false;
        state.admin = null;
        state.message = action.payload;
    },
    logoutAdminFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    //   forgot password
    forgotReq:(state) => {
        state.loading = true;
    },
    forgotSuc: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgotFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    //   reset password
    resetReq:(state) => {
        state.loading = true;
    },
    resetSuc: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // clear error and message 
    clearError: (state) => {
    	state.error = null;
    },
    clearMessage: (state) => {
    	state.message = null;
    }

});