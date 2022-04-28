import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";


const initialState = {
    taskLists: null,
    completedTasks: null,
    recentTasks: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// task list
// Get business tasks list
export const getAllCompanyTaskLists = createAsyncThunk(
    "task/getAllCompanyTaskLists",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.getAllCompanyTaskLists(id, token);
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

// get all users task lists
export const getAllUserTaskLists = createAsyncThunk(
    "task/getAllUserTaskLists",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.getAllUserTaskLists(token);
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

// create task list
export const createTaskList = createAsyncThunk(
    "task/createTaskList",
    async (taskList, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.createTaskList(taskList, token);
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

// update task list
export const updateTaskList = createAsyncThunk(
    "task/updateTaskList",
    async (taskList, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.updateTaskList(taskList, token);
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

// delete task list
export const deleteTaskList = createAsyncThunk(
    "task/deleteTaskList",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.deleteTaskList(id, token);
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


// complete task list item
// get all users tasks for a task list
export const getAllTasksForList = createAsyncThunk(
    "task/getAllTasksForList",
    async (taskListId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.getAllTasksForList(taskListId, token);
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

// get user recent completed tasks
export const getRecentUserTasks = createAsyncThunk(
    "task/getRecentUserTasks",
    async (taskListId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.getRecentUserTasks(taskListId, token);
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

// create task
export const createTask = createAsyncThunk(
    "task/createTask",
    async (task, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.createTask(task, token);
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

// delete task
export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await taskService.deleteTask(id, token);
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


// create slice
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // reset state 
        reset: (state) => {
            state.taskList = null;
            state.completedTasks = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // get all business task lists
        builder.addCase(getAllCompanyTaskLists.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllCompanyTaskLists.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.taskLists = action.payload;
        });
        builder.addCase(getAllCompanyTaskLists.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // get all user task lists
        builder.addCase(getAllUserTaskLists.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllUserTaskLists.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.taskLists = action.payload;
        });
        builder.addCase(getAllUserTaskLists.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // create task list
        builder.addCase(createTaskList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(createTaskList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.taskLists.push(action.payload);
        });
        builder.addCase(createTaskList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // update task list
        builder.addCase(updateTaskList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updateTaskList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            const index = state.taskLists.findIndex(
                (taskList) => taskList._id === action.payload._id
            );
            state.taskLists[index] = action.payload;
        });
        builder.addCase(updateTaskList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // delete task list
        builder.addCase(deleteTaskList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(deleteTaskList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            const index = state.taskLists.findIndex(
                (taskList) => taskList._id === action.payload
            );
            state.taskLists.splice(index, 1);
        });
        builder.addCase(deleteTaskList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // get users completed tasks
        builder.addCase(getAllTasksForList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllTasksForList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.completedTasks = action.payload;
        });
        builder.addCase(getAllTasksForList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // get recent user tasks
        builder.addCase(getRecentUserTasks.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getRecentUserTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.recentTasks = action.payload;
        });
        builder.addCase(getRecentUserTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // create complete task
        builder.addCase(createTask.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.completedTasks.push(action.payload);
        });
        builder.addCase(createTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // delete task
        builder.addCase(deleteTask.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            const index = state.completedTasks.findIndex(
                (task) => task._id === action.payload
            );
            state.completedTasks.splice(index, 1);
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    },
});


// export reducer
export const { reset } = taskSlice.actions;
export default taskSlice.reducer;