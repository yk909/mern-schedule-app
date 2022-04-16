const axios = require('axios');


const API_URL = '/api/invites/';


// Get all user invites
const getInvites = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(API_URL, config);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};


// Create invite
const createInvite = async (invite, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.post(API_URL, invite, config);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};


// Update invite
const editInvite = async (invite, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.put(`${API_URL}${invite._id}`, invite, config);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}


// Delete invite
const deleteInvite = async (invite, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.delete(`${API_URL}${invite}`, config);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}


const inviteService = {
    getInvites,
    createInvite,
    editInvite,
    deleteInvite
};


export default inviteService;