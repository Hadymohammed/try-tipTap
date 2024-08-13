import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
});

export const fetchData = async ( url:string , options = {}) => {
    try {
    const response = await axiosInstance(url, options);
    return response.data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
    }
};

