import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './reducers/newsReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 