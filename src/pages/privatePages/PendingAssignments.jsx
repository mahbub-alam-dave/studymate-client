import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import PendingAssignmentCard from "../../components/assignmentComponent/PendingAssignmentCard";
import EmptyComponents from "../../components/EmptyComponents";
import { ContextValue } from "../../Contextes/AllContexts";
import Swal from "sweetalert2";
import { IoIosInformationCircleOutline } from "react-icons/io";

const PendingAssignments = () => {
  const pendingSubmittedAssignments = useLoaderData();
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const { user } = useContext(ContextValue);
  const [pendingAssignments, setPendingAssignments] = useState(
    pendingSubmittedAssignments
  );

  const handlePendingAssignment = (assignment) => {
  if (assignment.email === user?.email) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "You can't evaluate your own submitted assignment",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  setSelectedAssignment(assignment);
  setOpenModal(true);
};

  if (pendingAssignments.length === 0) {
    return <EmptyComponents message={"No pending assignments"} />;
  }
  return (
    <div className="py-12 px-4 sm:px-5 md:px-6 flex flex-col gap-8 max-w-[1440px] w-full mx-auto">
      <h2 className="text-2xl lg:text-3xl font-bold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
        All Pending Assignments
      </h2>
      <div
        className="overflow-x-auto w-full shadow-sm rounded-xl overflow-hidden 
  text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]
  border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <th className="p-4">#</th>
              <th className="p-4">Title</th>
              <th className="p-4">Marks</th>
              <th className="p-4">Examinee Name</th>
              <th className="p-4">Notice</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingAssignments.map((assignment, index) => (
              <tr
                key={assignment._id}
                className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{assignment.title}</td>
                <td className="p-4">{assignment.marks}</td>
                <td className="p-4">{assignment.examineeName}</td>
                <td className="p-4">
                  {assignment.availability && (
                    <div className="flex items-center gap-1">
                      <IoIosInformationCircleOutline size={18} />
                      <span>The assignment has been removed</span>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <button
                  onClick={() => handlePendingAssignment(assignment)}
              className="btn btn-sm bg-[var(--color-primary)] dark:bg-[var(--color-primary)] text-[var(--color-text-primary-dark)] shadow-none hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)]  hover:bg-transparent"
                  >
                    Evaluate
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        {selectedAssignment && (
  <PendingAssignmentCard
    openModal={openModal}
    closeModal={() => {
      setOpenModal(false);
      setSelectedAssignment(null);
    }}
    assignment={selectedAssignment}
    pendingAssignments={pendingAssignments}
    setPendingAssignments={setPendingAssignments}
  />
)}
      </div>
    </div>
  );
};

export default PendingAssignments;
