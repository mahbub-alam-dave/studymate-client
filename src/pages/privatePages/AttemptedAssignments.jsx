import React, { Suspense, useContext } from "react";
import Loader from "../../components/Loader";
import SubmittedAssignmentCards from "../../components/assignmentComponent/SubmittedAssignmentCards";
import { ContextValue } from "../../Contextes/AllContexts";
import AllApis from "../../apis/AllApis";

const AttemptedAssignments = () => {
  const { user, loading } = useContext(ContextValue);

  return (
         <>
      {!loading && user && (
        <SubmittedAssignmentCards key={user.uid} email={user.email} />
      )}
    </>
  );
};

export default AttemptedAssignments;
