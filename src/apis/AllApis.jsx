import React from 'react';
// import UseAxiosSecure from '../hooks/UseAxiosSecure';


const AllApis = () => {
    // const axiosSecure = UseAxiosSecure()
    
    const mySubmittedAssignment = async (email) => {
        return await fetch(`http://localhost:3000/my-submitted-assignments?email=${email}`)
        .then(res => res.json())
    }

    return {
        mySubmittedAssignment
    }
};

export default AllApis;