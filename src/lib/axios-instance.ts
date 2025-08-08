import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;