import axios from 'axios';

// Create an instanc eof Axios with the base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

//Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');  //To be adjusted if using cookies
        if(token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;