import React from 'react';
import { ContextValue } from './AllContexts';

const ContextProvider = ({children}) => {


    const value ={
        
    }
    return (
        <ContextValue value={value}>
            {children}
        </ContextValue>
    );
};

export default ContextProvider;