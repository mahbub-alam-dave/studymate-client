import React, { useContext, useEffect, useState } from "react";
import EmptyComponents from "../EmptyComponents";
import { ContextValue } from "../../Contextes/AllContexts";
import Loader from "../Loader";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { IoIosInformationCircleOutline } from "react-icons/io";

const SubmittedAssignmentCards = () => {
  const { user } = useContext(ContextValue);

  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (user) {
      setFetching(true);
      axiosSecure
        .get(`/my-submitted-assignments?email=${user?.email}`)
        .then((res) => setSubmittedAssignments(res.data))
        .catch(console.error)
        .finally(() => setFetching(false));
    }
  }, [user, axiosSecure]);

  if (fetching) return <Loader />;
  if (submittedAssignments.length === 0) {
    return (
      <EmptyComponents message={"You haven't submitted any assignments"} />
    );
  }

  return (
    <div className="py-12 px-4 sm:px-5 md:px-6 flex flex-col gap-8 max-w-[1440px] mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FF3F33] dark:text-gray-200">
        My Submitted Assignments
      </h2>
      <div className="flex flex-col gap-6 w-full">
        {submittedAssignments.map((submittedAssignment, index) => {
          return (
            <div
              key={submittedAssignment._id}
              className="w-full shadow-gray-400 dark:shadow-[#000814] bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814] text-gray-200 border border-white dark:border-[#03045e] shadow-sm p-4 sm:p-6 flex flex-col gap-2 rounded-xl"
            >
              {submittedAssignment.availability && (
                <div className="text-[#2980b9] flex items-center mt-2 gap-2">
                  <IoIosInformationCircleOutline size={20} />
                  <span className="">
                      The assignment has removed by the assignment holder
                  </span>
                </div>
              )}
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">
                {index + 1}. {submittedAssignment?.title}
              </h2>
              <p className="text-base">
                <span className="font-semibold">Total Marks: </span>{" "}
                {submittedAssignment?.marks}
              </p>
              <p className="text-base">
                <span className="font-semibold">Status: </span>{" "}
                {submittedAssignment?.status}
              </p>
              {submittedAssignment?.examinerFeedback ? (
                <div>
                  <p>
                    <span className="font-semibold">Obtained Marks:</span>{" "}
                    {submittedAssignment?.obtainedMarks}
                  </p>
                  <p>
                    <span className="font-semibold">Examiner Feedback:</span>{" "}
                    {submittedAssignment?.examinerFeedback}
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-[#ffcc00]">
                    No marks or feedback given yet !!
                  </h2>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubmittedAssignmentCards;
