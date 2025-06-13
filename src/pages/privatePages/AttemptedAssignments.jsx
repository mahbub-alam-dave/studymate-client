import React, { Suspense, useContext } from 'react';
import Loader from '../../components/Loader';
import SubmittedAssignmentCards from '../../components/assignmentComponent/SubmittedAssignmentCards';
import { ContextValue } from '../../Contextes/AllContexts';
import AllApis from '../../apis/AllApis';

const AttemptedAssignments = () => {

    const {user} = useContext(ContextValue)
    const {mySubmittedAssignment} = AllApis()

    return (
        <Suspense fallback={<Loader />}>
            <SubmittedAssignmentCards mySubmittedAssignment={mySubmittedAssignment(user?.email)} />
        </Suspense>
    );
};

export default AttemptedAssignments;