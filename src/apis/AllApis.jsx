import React from 'react';
import UseAxiosSecure from '../hooks/UseAxiosSecure';


const AllApis = () => {
    const axiosSecure = UseAxiosSecure()
    
    const mySubmittedAssignment = async (email) => {
        // return await fetch(`http://localhost:3000/my-submitted-assignments?email=${email}`)
        // .then(res => res.json())
        return axiosSecure.get(`/my-submitted-assignments?email=${email}`)
        .then(res => res.data)
    }

    return {
        mySubmittedAssignment
    }
};

export default AllApis;