import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import issueReducer from "./issueSlice";

const store=configureStore({
    reducer:{
        projects:projectReducer,
        issues:issueReducer
    }
});
export default store;