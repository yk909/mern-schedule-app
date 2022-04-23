import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import companyReducer from '../features/company/companySlice';
import businessReducer from '../features/business/businessSlice';
import employeeReducer from '../features/employee/employeeSlice';
import shiftReducer from '../features/shift/shiftSlice';
import inviteReducer from '../features/invite/inviteSlice';
import globalMessageReducer from '../features/globalMessage/globalMessageSlice';
import taskReducer from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    business: businessReducer,
    employee: employeeReducer,
    shift: shiftReducer,
    invite: inviteReducer,
    globalMessage: globalMessageReducer,
    task: taskReducer,
  },
});
