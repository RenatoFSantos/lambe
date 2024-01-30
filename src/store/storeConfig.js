import {createSlice, configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const loggerInitialState = {
  name: null,
  email: null,
};

export const loggerSlice = createSlice({
  name: 'logger',
  initialState: loggerInitialState,
  reducer: {
    login: {},
  },
});
