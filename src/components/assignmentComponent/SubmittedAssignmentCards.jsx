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
        .catch(error =>{
          // error occured
        })
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
    <div className="py-8 flex flex-col gap-6 sm:gap-8 md:gap-12 pb-12 max-w-[1440px] w-full mx-auto">
      <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
        My Submitted Assignments
      </h2>
      <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">All the assignments you have participated in. You can check whether the assignments is evaluated or not</p>
      </div>
<div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] overflow-x-auto w-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-xl overflow-hidden">
  <table className="w-full border-collapse">
    <thead>
      <tr className="text-left border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
        <th className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">#</th>
        <th className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Title</th>
        <th className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Total Marks</th>
        <th className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Status</th>
        <th className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Obtained Marks</th>
        <th className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Examiner Feedback</th>
        <th className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Notice</th>
      </tr>
    </thead>
    <tbody>
      {submittedAssignments.map((submittedAssignment, index) => (
        <tr
          key={submittedAssignment._id}
          className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
        >
          <td className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{index + 1}</td>
          <td className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{submittedAssignment.title}</td>
          <td className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{submittedAssignment.marks}</td>
          <td className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{submittedAssignment.status}</td>
          <td className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
            {submittedAssignment.examinerFeedback
              ? submittedAssignment.obtainedMarks
              : '—'}
          </td>
          <td className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
            {submittedAssignment.examinerFeedback
              ? submittedAssignment.examinerFeedback
              : 'No feedback yet'}
          </td>
          <td className="p-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
            {submittedAssignment.availability && (
              <div className="flex items-center gap-1">
                <IoIosInformationCircleOutline size={18} />
                <span>The assignment has been removed</span>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default SubmittedAssignmentCards;
