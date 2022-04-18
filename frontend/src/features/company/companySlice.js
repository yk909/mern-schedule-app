import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyService from "./companyService";


const initialState = {
    company: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// Create company
export const createCompany = createAsyncThunk(
    'company/create',
    async (company, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await companyService.createCompany(company, token);
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


// Get company
export const getCompany = createAsyncThunk(
    'company/get',
    async (company, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await companyService.getCompany(token);
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


// Update company
export const updateCompany = createAsyncThunk(
    'company/update',
    async (company, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await companyService.updateCompany(company, token);
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


// Delete company
export const deleteCompany = createAsyncThunk(
    'company/delete',
    async (company, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await companyService.deleteCompany(company, token);
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
const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.company = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Create company
        builder.addCase(createCompany.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        });
        builder.addCase(createCompany.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = '';
            state.company.push(action.payload)
        });
        builder.addCase(createCompany.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get company
        builder.addCase(getCompany.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        });
        builder.addCase(getCompany.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = '';
            state.company = action.payload;
        });
        builder.addCase(getCompany.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.company = null;
        });

        // Update company
        builder.addCase(updateCompany.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        });
        builder.addCase(updateCompany.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = '';
            state.company = action.payload;
        });
        builder.addCase(updateCompany.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.company = null;
        });

        // Delete company
        builder.addCase(deleteCompany.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        });
        builder.addCase(deleteCompany.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = '';
            state.company = action.payload;
        });
        builder.addCase(deleteCompany.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.company = null;
        });
    }
});


// Export reducer
export const { reset } = companySlice.actions;
export default companySlice.reducer;