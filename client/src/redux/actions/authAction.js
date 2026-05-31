import axios from "axios";

const devMode = process.env.NODE_ENV !== "production";

// register user
export const registerUser = async (userData) => {

    if (devMode) {
        console.log("======= REGISTER USER =======", userData);
    }

    try {
        const response = await axios.post("/api/v1/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user: ", error);
        throw { error: error.message };
    }
}

// login user
export const loginUser = async (credentials) => {
    if (devMode) {
        console.log("======= LOGIN USER =======", credentials);
    }

    try {
        const response = await axios.post("/api/v1/login", credentials);
        
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;

    } catch (error) {
        console.error("Error logging in user: ", error);
        throw { error: error.message };
    }
}