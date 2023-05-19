import { configureStore } from '@reduxjs/toolkit';

import layoutReducer from '../components/cardgrid/gridLayoutSlice';

export const store = configureStore({
    reducer: {
      layout: layoutReducer,
    }
});
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;