import axios from 'axios';
import React, { useContext } from 'react';
import { ContextValue } from '../Contextes/AllContexts';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const UseAxiosSecure = () => {
    const {user} = useContext(ContextValue)

    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config
    })

    axiosInstance.interceptors.response.use(response => {
        return response;

    }, error => {
        if(error.status === 401 || error.status === 403) {
            console.log("log out the user", error)
        }
        return Promise.reject(error)
    })

    return axiosInstance
};

export default UseAxiosSecure;