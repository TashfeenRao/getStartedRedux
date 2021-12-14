import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counterReduxer";


const store = configureStore({
    reducer: {
        counter: counterSlice
    }
})
export default store