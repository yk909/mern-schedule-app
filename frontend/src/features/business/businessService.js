import axios from "axios";


const API_URL = '/api/businesses/';


// Create business
const createBusiness = async (companyId, businessData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}company/${companyId}`, businessData, config);

    return response.data;
}


// Get business
const getBusiness = async (businessId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}${businessId}`, config);
    return response.data;
}


// Update business
const updateBusiness = async (businessId, businessData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${businessId}`, businessData, config);
    return response.data;
}


// Delete business
const deleteBusiness = async (businessId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${businessId}`, config);
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