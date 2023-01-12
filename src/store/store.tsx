import { configureStore } from '@reduxjs/toolkit';
import phrasesReducer from './slices/phrasesSlice';

export const store = configureStore({
  reducer: {
    phrases: phrasesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
