import UseAxiosSecure from '../hooks/UseAxiosSecure';


const AllApis = () => {
    const axiosSecure = UseAxiosSecure()
    
    const mySubmittedAssignment = async (email) => {
        // return await fetch(`http://localhost:3000/my-submitted-assignments?email=${email}`)
        // .then(res => res.json())
        return axiosSecure.get(`/my-submitted-assignments?email=${email}`)
        .then(res => res.data)
    }

    const secureByFirebaseToken = async (url) => {
        console.log(url)
        // return await axiosSecure.get(url)
        // .then(res => res.json())
    }

    return {
        mySubmittedAssignment,
        secureByFirebaseToken
    }
};

export default AllApis;