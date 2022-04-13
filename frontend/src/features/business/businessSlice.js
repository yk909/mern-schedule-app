import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import businessService from "./businessService";


const initialState = {
    businesses: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// Create business
export const createBusiness = createAsyncThunk(
    'business/create',
    async (business, thunkAPI) => {
        try {
            return await businessService.createBusiness(business);
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
            return await businessService.getBusiness(business);
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
            return await businessService.updateBusiness(business);
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
            return await businessService.deleteBusiness(business);
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
            return await businessService.getBusinesses(business);
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
    }
});


// Export reducer
export const { reset } = businessSlice.actions;
export default businessSlice.reducer;