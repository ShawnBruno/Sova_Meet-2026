import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie"; // npm i react-cookie to manage cookies in React applications


const cookies = new Cookies();

const themeSlice = createSlice({
    name: "activeTheme",
    initialState: {
        activeTheme: "dark"
    },
    reducers: {
        getActiveTheme: (state) => {
            const cookieData = cookies.getAll(); // Get all cookies as an object
            state.activeTheme = cookieData?.activeTheme ?? "light"; // Can also be written as cookieData.activeTheme ? cookieData.activeTheme : "light"
            // state.activeTheme == state.activeTheme ?? "light";
        }, //ask: what the active theme is from the cookie and set it to the state, if there is no cookie, set it to lightd
        toggleTheme: (state) => {
            state.activeTheme = state.activeTheme === "light" ? "dark" : "light";
            cookies.set("activeTheme", state.activeTheme, {
                maxAge: 60 * 60 * 24, // Cookie expires in 1 day
            });// Set the cookie with the new theme value and an expiration time of 1 day
        }
    }
});


export const themeReducer = themeSlice.reducer;
export const { getActiveTheme, toggleTheme } = themeSlice.actions;
export const selectTheme = (state) => state.activeTheme;
