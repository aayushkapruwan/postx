import { configureStore } from '@reduxjs/toolkit';
import authreducer from "../slices/authslice"
const store = configureStore({
  reducer: {
    authslice:authreducer
  },
});

export default store;
