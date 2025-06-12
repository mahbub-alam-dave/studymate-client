import React, { useContext } from 'react';
import { ContextValue } from '../Contextes/AllContexts';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(ContextValue)
    const location = useLocation()

    if(loading) return <Loader />

    if(!user) {
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }

    return children
};

export default PrivateRoute;