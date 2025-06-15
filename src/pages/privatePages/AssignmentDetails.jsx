import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import AssignmentSubmitModal from "../../components/assignmentComponent/AssignmentSubmitModal";
import { ContextValue } from "../../Contextes/AllContexts";
import axios from "axios";
import Swal from "sweetalert2";

const AssignmentDetails = () => {
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const { user } = useContext(ContextValue);

  const assignment = useLoaderData();
  // console.log(assignment)

  const handleAssignmentSubmitModal = (data) => {
    console.log("Assignment Submitted Data:", data);
    const submittedAssignmentInfo = {
      ...data,
      assignmentId: assignment._id,
      examineeName: user?.displayName,
      email: user?.email,
      status: "pending",
    };

    // save submitted assignment to the database
    axios
      .post(
        "http://localhost:3000/submitted-assignments",
        submittedAssignmentInfo
      )
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment submitted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="py-12">
    <div className="max-w-[1024px] w-full bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] border-[#00b4d8] dark:border-[#03045e] text-gray-200 mx-auto flex flex-col justify-center  border rounded-2xl relative">
      <img
        className="w-full h-[450px] object-cover rounded-tl-2xl rounded-tr-2xl"
        src={assignment.imageUrl}
        alt={assignment.title}
      />
      <div className="flex flex-col gap-2 p-4 relative">
        <p
          className={`absolute top-2 left-4 p-1 rounded-sm text-sm text-[#e9e9e9] mb-4 ${
            assignment.level === "Easy"
              ? "bg-green-500"
              : assignment.level === "Medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {assignment.level}
        </p>
        <p className="mt-5 text-2xl sm:text-3xl font-semibold">
          {assignment.title}
        </p>
        <p>
          <span>Due Date: </span>
          {assignment.dueDate}
        </p>
        <p>
          <span>Marks: </span> {assignment.marks}
        </p>
        <p>{assignment.description}</p>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setOpenSubmitModal(true)} className="btn text-base mt-2 bg-[#4ED7F1] dark:bg-[#03045e] text-gray-200 hover:text-white hover:bg-transparent">
            Take Assignment
          </button>
          <AssignmentSubmitModal
            openModal={openSubmitModal}
            closeModal={() => setOpenSubmitModal(false)}
            submitAssignment={handleAssignmentSubmitModal}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AssignmentDetails;
