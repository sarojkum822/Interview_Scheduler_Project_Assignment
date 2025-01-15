// frontend/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import interviewReducer from '../Redux/interviewsSlice';

const store = configureStore({
    reducer: {
        interviews: interviewReducer,
    },
});

export default store;