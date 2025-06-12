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
    <div className="max-w-lg w-full dark:bg-gray-800 dark:text-gray-200 mx-auto flex flex-col justify-center  border rounded-2xl relative my-12">
      <img
        className="w-full object-cover rounded-tl-2xl rounded-tr-2xl"
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
        {/* <h2><span>Assignment title: </span> {assignment.title}</h2> */}
        {/* <p><span>Difficulty: </span> {assignment.level}</p> */}
        {/* <p><span>Due Date: </span> {assignment.dueDate}</p> */}
        {/* <p><span>Marks: </span> {assignment.marks}</p> */}
        {/* <p><span>Description: </span> {assignment.description}</p> */}
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
          <button onClick={() => setOpenSubmitModal(true)} className="btn">
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
  );
};

export default AssignmentDetails;
