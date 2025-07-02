import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router";
import AssignmentSubmitModal from "../../components/assignmentComponent/AssignmentSubmitModal";
import { ContextValue } from "../../Contextes/AllContexts";
import axios from "axios";
import Swal from "sweetalert2";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const AssignmentDetails = () => {
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const { user } = useContext(ContextValue);

  const assignment = useLoaderData();

  const handleAssignmentSubmitModal = (data) => {
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
        `${import.meta.env.VITE_api_url}/submitted-assignments`,
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

  const handleTakeAssignment = () => {
    if (assignment.email === user.email) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't submit to your own added assignment",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setOpenSubmitModal(true);
  };

  return (
    <div className="py-12">
      <div className="max-w-[1024px] w-full mx-auto flex flex-col gap-8 justify-center items-start px-4 sm:px-5 md:px-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
        <Link to={'/assignments'}>
          <div className="flex gap-2 items-center text-lg text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] cursor-pointer">
            <MdOutlineKeyboardDoubleArrowLeft size={20} />
            <span>Go back</span>
          </div>
        </Link>

        <div className=" w-full bg-[var(--color-bg-card)] dark:bg-transparent mx-auto flex flex-col justify-center border border-[var(--color-border)] dark:border-[var(--color-border-dark)] shadow-sm rounded-2xl relative">
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
              <button
                onClick={handleTakeAssignment}
                className="btn mt-2 bg-[var(--color-primary)] dark:bg-[var(--color-primary)] text-[var(--color-text-primary-dark)] hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] hover:bg-transparent"
              >
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
    </div>
  );
};

export default AssignmentDetails;
