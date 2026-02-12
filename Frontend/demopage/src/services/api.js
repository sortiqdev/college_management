import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_MASTER_BASE_URL || 'http://localhost:5003/api/',
    withCredentials: true, // important for cookies
}

);
export default API;