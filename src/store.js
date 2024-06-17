import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./component/searchSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
  },
})