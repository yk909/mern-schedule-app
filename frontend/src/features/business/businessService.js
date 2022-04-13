import axios from "axios";


const API_URL = '/api/businesses/';


// Create business
const createBusiness = async (data) => {
    data.business.positions = data.business.positions ? await data.business.positions.map(position => { return position.value }) : [];
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
        }
    };
    const response = await axios.post(API_URL, data.business, config);

    return response.data;
}


// Get business
const getBusiness = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
        }
    };
    const response = await axios.get(`${API_URL}${data.businessId}`, config);
    return response.data;
}


// Update business
const updateBusiness = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
        }
    };
    const response = await axios.put(`${API_URL}${data.businessId}`, data.businessData, config);
    return response.data;
}


// Delete business
const deleteBusiness = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${data.businessId}`, config);
    return response.data;
}


// Get all businesses
const getBusinesses = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
        }
    };
    const response = await axios.get(`${API_URL}company/${data.id}`, config);
    return response.data;
}


const businessService = {
    createBusiness,
    getBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinesses,
};


export default businessService;