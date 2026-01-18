import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',

})

const useAxiosSecure = () => {

    const { user } = useAuth();

    axiosSecure.interceptors.request.use((config) => {
        // You can add authorization headers or other configurations here
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    return axiosSecure;
};

export default useAxiosSecure;