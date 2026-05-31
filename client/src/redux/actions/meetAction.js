import axios from "axios";


//add meet
export const addMeet = async (meetData) => {

    if (devMode) {
        console.log("======= ADD MEET =======", meetData);
    }

    try {
        const response = await axios.post("/api/v1/add/meet", meetData);
        return response.data;
    } catch (error) {
        console.error("Error adding meet: ", error);
        throw { error: error.message };
    }
}


//delete meet
export const deleteMeet = async (meetId) => {

    if (devMode) {
        console.log("======= DELETE MEET =======", meetId);
    }

    try {
        const response = await axios.delete(`/api/v1/delete/meet/${meetId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting meet: ", error);
        throw { error: error.message };
    }
}

//update meet
export const updateMeet = async (meetId, meetData) => {
    if (devMode) {
        console.log("======= UPDATE MEET =======", meetId, meetData);
        try {
            const response = await axios.put(`/api/v1/update/meet/${meetId}`, meetData);

        };
        return response.data;
    } catch (error) {
        console.error("Error updating meet: ", error);
        throw { error: error.message };
    }
}