import UseAxiosSecure from '../hooks/UseAxiosSecure';


const AllApis = () => {
    const axiosSecure = UseAxiosSecure()
    
    const mySubmittedAssignment = async (email) => {
         if (!email) return [];
        return axiosSecure.get(`/my-submitted-assignments?email=${email}`)
        .then(res => res.data)
    }

    return {
        mySubmittedAssignment
    }
};

export default AllApis;