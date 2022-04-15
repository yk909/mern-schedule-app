import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import shiftService from './shiftService';


const initialState = {
    shifts: null,
    employees: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
}


// Get all employees for the business
export const getAllBusinessShifts = createAsyncThunk(
    'shift/getAllBusinessShifts',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await shiftService.getAllBusinessShifts(id, token);
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


// Create Shift
export const createShift = createAsyncThunk(
    'shift/createShift',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await shiftService.createShift(data, token);
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


// Update Shift
export const editShift = createAsyncThunk(
    'shift/editShift',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await shiftService.editShift(data, token);
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


// Delete Shift
export const deleteShift = createAsyncThunk(
    'shift/deleteShift',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await shiftService.deleteShift(id, token);
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


// Create Slice
const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        // Reset shift state
        resetShift: (state) => {
            state.shifts = null;
            state.employees = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // Get all employees
        builder.addCase(getAllBusinessShifts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllBusinessShifts.fulfilled, (state, action) => {
            state.employees = action.payload.employees;
            state.shifts = action.payload.shifts;
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
        });
        builder.addCase(getAllBusinessShifts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create Shift
        builder.addCase(createShift.pending, (state, action) => {
            // state.isLoading = true;
        });
        builder.addCase(createShift.fulfilled, (state, action) => {
            state.shifts.push(action.payload);
            state.isSuccess = true;
            state.isError = false;
            // state.isLoading = false;
        });
        builder.addCase(createShift.rejected, (state, action) => {
            // state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Edit Shift
        builder.addCase(editShift.pending, (state, action) => {
            // state.isLoading = true;
        });
        builder.addCase(editShift.fulfilled, (state, action) => {
            state.shifts = state.shifts.map((shift) => {
                if (shift._id === action.payload._id) {
                    return action.payload;
                }
                return shift;
            });
            state.isSuccess = true;
            state.isError = false;
            // state.isLoading = false;
        });
        builder.addCase(editShift.rejected, (state, action) => {
            // state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Delete Shift
        builder.addCase(deleteShift.pending, (state, action) => {
            // state.isLoading = true;
        });
        builder.addCase(deleteShift.fulfilled, (state, action) => {
            state.shifts = state.shifts.filter((shift) => {
                return shift._id !== action.payload._id;
            });
            state.isSuccess = true;
            state.isError = false;
            // state.isLoading = false;
        });
        builder.addCase(deleteShift.rejected, (state, action) => {
            // state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    },
});


// exportn reducer
export const { reset } = shiftSlice.actions;
export default shiftSlice.reducer;