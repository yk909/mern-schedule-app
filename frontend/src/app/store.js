import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import companyReducer from '../features/company/companySlice';
import businessReducer from '../features/business/businessSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    business: businessReducer,
  },
});
