import {configureStore, Tuple, applyMiddleware} from '@reduxjs/toolkit';

import logger from 'redux-logger';
// import rootReducer from './rootReducer';
import userReducer from './user/slice';
import postReducer from './post/slice';

const store = configureStore({
  reducer: {
    root: userReducer,
    postReducer: postReducer,
  },
  middleware: () => new Tuple(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
