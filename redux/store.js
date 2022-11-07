import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./reducer";

const store = configureStore({
    reducer:{
        auth
    }
});

export default store;