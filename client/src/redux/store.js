import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlilce";

const store = configureStore({
    reducer : {
        account : accountSlice,
    }
})
export default store