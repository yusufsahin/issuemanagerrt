import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import issueReducer from "./issueSlice";
import authReducer from "./authSlice";

const store=configureStore({
    reducer:{
        projects:projectReducer,
        issues:issueReducer,
        auth:authReducer
    }
});
export default store;