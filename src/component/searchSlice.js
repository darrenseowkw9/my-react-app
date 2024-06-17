import {createSlice} from "@reduxjs/toolkit";


export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: [],
    type: []
  },
  reducers: {
    saveSearch: (state, action) => {
      if(state.value.length > 9){
        state.value.shift();
        state.type.shift();
      }
      state.value.push(String(action.payload.value));
      state.type.push(action.payload.type);
      // state.posts.push(action.payload);
    }
  }
});

// export const selectAllPosts = (state) => state.posts.posts;

export const {saveSearch} = searchSlice.actions;

export default searchSlice.reducer;