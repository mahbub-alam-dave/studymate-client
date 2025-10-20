import React, { useContext, useState } from "react";
import Loader from "../../components/Loader";
import PendingAssignmentCard from "../../components/assignmentComponent/PendingAssignmentCard";
import EmptyComponents from "../../components/EmptyComponents";
import { ContextValue } from "../../Contextes/AllContexts";
import Swal from "sweetalert2";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const PendingAssignments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const { user } = useContext(ContextValue);
  const axiosSecure = UseAxiosSecure();

  const { data: pendingAssignments = [], isLoading: pendingLoading, isError } = useQuery({
    queryKey: ["pending-assignments"], // cache key
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_api_url}/api/submissions/pending-assignments`
      );
      return res.data;
    },
  });

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

  console.log(pendingAssignments)

  // ✅ Show loader if user context loading or local loading
  if (pendingLoading) return <Loader />;

  if (pendingAssignments.length === 0) {
    return <EmptyComponents message={"No pending assignments"} />;
  }

  return (
    <div className="py-8 flex flex-col gap-6 sm:gap-8 md:gap-12 pb-12 w-full text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
          All Pending Assignments
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          All the Pending assignments submitted by students. If you wish you can
          evaluate any of them
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 w-full">
        <div
          className="overflow-x-auto w-full rounded-xl overflow-hidden 
        text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]
        border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]"
        >
          <table className="w-full min-w-[600px] border-collapse">
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
                  <td className="p-4">{assignment?.examineeName}</td>
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
                      className="btn border-none btn-sm bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] shadow-none hover:opacity-90"
                    >
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

{/*           {selectedAssignment && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PendingAssignments;
