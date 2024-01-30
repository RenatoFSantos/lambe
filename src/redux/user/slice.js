import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUser: {name: 'Anonymous', email: '', password: ''},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state = initialState, action) => {
      state.currentUser = {
        email: action.payload.email,
        name: action.payload.name,
      };
    },
    logout: state => {
      state.currentUser = {...initialState};
    },
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
