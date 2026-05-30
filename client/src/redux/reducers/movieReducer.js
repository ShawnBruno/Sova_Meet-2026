// 3 different states of fetching users data from the database
// 1. where we have fetched/fullfilled
// 2. rejected/error
// 3. pending/loading

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie"; // npm i react-cookie to manage cookies in React applications

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const response = await axios.get("/api/v1/get/users");
        console.log("Users data: ", response.data);
        return response.data;
        // setUsers(response.data); // Update state with fetched users data
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw { error: error.message };
    }finally {
        console.log("Finally: fetchUsers function completed in movieReducer.js");
    }
});

// const cookies = new Cookies();
const userSlice = createSlice({
    name: "userData",
    initialState: {
        user: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // when the fetchUsers is pending/loading, the movies will be set to the following state
        builder.addCase(fetchUsers.pending, (state) => {
            state.user = [];
            state.loading = "loading";
            state.error = null;
        });
        // when the fetchUsers is fulfilled/success, the movies will be set to the following state
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.user = action.payload.response; // action.payload is the data returned from the server
            state.loading = "loaded";
            state.error = null;
        });
        // when the fetchUsers is rejected/error, the movies will be set to the following state
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.user = [];
            state.loading = "error";
            state.error = action.error.error; // action.error.error is the error message returned from the server
        });
    }
});


export const userReducer = userSlice.reducer;
// export const { getActiveTheme, toggleTheme } = themeSlice.actions;
export const selectUser = (state) => state.userData;
