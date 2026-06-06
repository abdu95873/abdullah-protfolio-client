import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    // You can add other default configurations here
});

const useAxios = () => {
    return axiosInstance
};

export default useAxios;