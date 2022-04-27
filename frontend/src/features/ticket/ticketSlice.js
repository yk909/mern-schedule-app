import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ticketService from './ticketService';


const initialState = {
    tickets: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    msg: '',
};


const getAllManagerTickets = createAsyncThunk(
    'ticket/getAllManagerTickets',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getAllManagerTickets(token);
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


const getAllEmployeeTickets = createAsyncThunk(
    'ticket/getAllEmployeeTickets',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getAllEmployeeTickets(token);
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


const createTicket = createAsyncThunk(
    'ticket/createTicket',
    async (ticket, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.createTicket(ticket, token);
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


const updateTicket = createAsyncThunk(
    'ticket/updateTicket',
    async (ticket, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.updateTicket(ticket, token);
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


const deleteTicket = createAsyncThunk(
    'ticket/deleteTicket',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.deleteTicket(id, token);
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


// create a slice
const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        // reset the state
        reset: (state) => {
            state.tickets = [];
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // get all tickets for a manager
        builder.addCase(getAllManagerTickets.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllManagerTickets.fulfilled, (state, action) => {
            state.tickets = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(getAllManagerTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // get all tickets for an employee
        builder.addCase(getAllEmployeeTickets.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllEmployeeTickets.fulfilled, (state, action) => {
            state.tickets = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(getAllEmployeeTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // create a ticket
        builder.addCase(createTicket.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(createTicket.fulfilled, (state, action) => {
            state.tickets.push(action.payload);
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // update a ticket
        builder.addCase(updateTicket.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updateTicket.fulfilled, (state, action) => {
            const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
            state.tickets[index] = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(updateTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // delete a ticket
        builder.addCase(deleteTicket.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(deleteTicket.fulfilled, (state, action) => {
            state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(deleteTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


// export the slice
export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;