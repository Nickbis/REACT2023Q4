import { configureStore } from '@reduxjs/toolkit';
import dataFormReducer from './dataSlice';

const store = configureStore({
  reducer: {
    dataForm: dataFormReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
