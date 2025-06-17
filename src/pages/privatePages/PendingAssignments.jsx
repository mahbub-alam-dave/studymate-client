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
  const { user } = useContext(ContextValue);
  // console.log(pendingSubmittedAssignments)
  const [pendingAssignments, setPendingAssignments] = useState(
    pendingSubmittedAssignments
  );

  const handlePendingAssignment = (email) => {
    // console.log("pending assignment btn")
    if (email === user?.email) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't evaluate own submitted Assignments",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setOpenModal(true);
  };

  if (pendingAssignments.length === 0) {
    return <EmptyComponents message={"No pending assignments"} />;
  }
  return (
    <div className="py-12 px-4 sm:px-5 md:px-6 flex flex-col gap-8 max-w-[1440px] w-full mx-auto">
      <h2 className="text-2xl lg:text-3xl font-bold text-center text-[#FF3F33] dark:text-gray-200">
        All Pending Assignments
      </h2>
      <div className="flex flex-col gap-4">
        {pendingAssignments.map((assignment, index) => {
          return (
            <div
              key={assignment._id}
              className=" p-4 sm:p-6 rounded-xl flex flex-col gap-2 items-start bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814] text-gray-200 border border-white shadow-sm dark:border-[#03045e]"
            >
              {
                  assignment.availability && 
              <div className="text-[#2980b9] flex items-center mt-2 gap-2">
                <IoIosInformationCircleOutline  size={20}/>
                <span className="">The assignment has removed by the assignment holder</span>
              </div>
                }
              <h2 className="text-2xl sm:text-3xl font-bold">
                <span className=" ">{index + 1}. </span>
                {assignment.title}
              </h2>
              <p className="text-base sm:text-lg">
                <span className="font-bold">Marks: </span> {assignment.marks}
              </p>
              <p className="text-base sm:text-lg">
                <span className="font-bold">Examinee Name: </span>{" "}
                {assignment.examineeName}
              </p>
              <button
                onClick={() => handlePendingAssignment(assignment.email)}
                className="btn bg-[#4ED7F1] dark:bg-[#03045e] text-gray-200 text-base"
              >
                Evaluate{" "}
              </button>
                
              <PendingAssignmentCard
                openModal={openModal}
                closeModal={() => setOpenModal(false)}
                assignment={assignment}
                // handlePendingAssignment={handlePendingAssignment}
                pendingAssignments={pendingAssignments}
                setPendingAssignments={setPendingAssignments}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingAssignments;
