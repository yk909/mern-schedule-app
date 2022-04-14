import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import businessService from "./businessService";
import employeeService from "../employee/employeeService";


const initialState = {
    businesses: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoadingEmployee: false,
    isErrorEmployee: false,
    msg: '',
};


// Create business
export const createBusiness = createAsyncThunk(
    'business/create',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.createBusiness(business, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Get business
export const getBusiness = createAsyncThunk(
    'business/get',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.getBusiness(business, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Update business
export const updateBusiness = createAsyncThunk(
    'business/update',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.updateBusiness(business, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Delete business
export const deleteBusiness = createAsyncThunk(
    'business/delete',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.deleteBusiness(business, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Get businesses
export const getBusinesses = createAsyncThunk(
    'business/getBusinesses',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.getBusinesses(business, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Create employee
export const createEmployee = createAsyncThunk(
    'business/createEmployee',
    async (employee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.createEmployee(employee, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Update employee
export const editEmployee = createAsyncThunk(
    'business/editEmployee',
    async (employee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.editEmployee(employee, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Delete employee
export const deleteEmployee = createAsyncThunk(
    'business/deleteEmployee',
    async (employee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.deleteEmployee(employee, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Create slice
const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.businesses = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Create business
        builder.addCase(createBusiness.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.businesses.push(action.payload)
        });
        builder.addCase(createBusiness.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Get business
        builder.addCase(getBusiness.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.businesses = action.payload;
        });
        builder.addCase(getBusiness.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Update business
        builder.addCase(updateBusiness.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.businesses = action.payload;
        });
        builder.addCase(updateBusiness.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Delete business
        builder.addCase(deleteBusiness.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.businesses = action.payload;
        });
        builder.addCase(deleteBusiness.rejected, (state, action) => {         
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Get businesses
        builder.addCase(getBusinesses.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBusinesses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.businesses = action.payload;
        });
        builder.addCase(getBusinesses.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Create employee
        builder.addCase(createEmployee.pending, (state, action) => {
            state.isLoadingEmployee = true;
            state.msg = '';
        });
        builder.addCase(createEmployee.fulfilled, (state, action) => {
            state.isLoadingEmployee = false;
            state.isErrorEmployee = false;
            state.businesses.map(business => 
                {
                    if(business._id === action.payload.business._id) {
                        business.employees.push(action.payload);
                    }
                }
            )
        });
        builder.addCase(createEmployee.rejected, (state, action) => {
            state.isLoadingEmployee = false;
            state.isErrorEmployee = true;
            state.msg = action.payload;
        });

        // Update employee
        builder.addCase(editEmployee.pending, (state, action) => {
            state.isLoadingEmployee = true;
            state.msg = '';
        });
        builder.addCase(editEmployee.fulfilled, (state, action) => {
            state.isLoadingEmployee = false;
            state.isErrorEmployee = false;
            console.log(action.payload);
            state.businesses.map((business, index) => 
                {
                    if(business._id === action.payload[0]._id) {
                        state.businesses[index] = action.payload[0];
                    }

                    if(action.payload[1] && business._id === action.payload[1]._id){
                        state.businesses[index] = action.payload[1];
                    }
                }
            )
        });
        builder.addCase(editEmployee.rejected, (state, action) => {
            state.isLoadingEmployee = false;
            state.isErrorEmployee = true;
            state.msg = action.payload;
        });

        // Delete employee
        builder.addCase(deleteEmployee.pending, (state, action) => {
            state.isLoadingEmployee = true;
            state.msg = '';
        });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.isLoadingEmployee = false;
            state.isErrorEmployee = false;
            state.businesses.map(business => 
                {
                    if(business._id === action.payload.business) {
                        business.employees = business.employees.filter(employee => employee._id !== action.payload._id)
                    }
                }
            )
        });
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            state.isLoadingEmployee = false;
            state.isErrorEmployee = true;
            state.msg = action.payload;
        });
    }
});


// Export reducer
export const { reset } = businessSlice.actions;
export default businessSlice.reducer;