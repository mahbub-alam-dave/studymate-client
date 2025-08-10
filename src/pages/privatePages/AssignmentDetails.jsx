import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router";
import AssignmentSubmitModal from "../../components/assignmentComponent/AssignmentSubmitModal";
import { ContextValue } from "../../Contextes/AllContexts";
import axios from "axios";
import Swal from "sweetalert2";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import Loader from "../../components/Loader"

const AssignmentDetails = () => {
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const { user, loading } = useContext(ContextValue);

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

  if(loading) {
    return <Loader />
  }

  console.log(loading)

  return (
    <div className="py-16 px-4 sm:px-5 md:px-6">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-8 justify-center items-start text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">

        <div className=" w-full bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] mx-auto flex  flex-col lg:flex-row gap-6  rounded-2xl relative">
          <img
            className="lg:w-[50%] h-[450px] object-cover rounded-tl-2xl rounded-tr-2xl lg:rounded-tr-none lg:rounded-bl-2xl flex-1"
            src={assignment.imageUrl}
            alt={assignment.title}
          />
          <div className="flex flex-col justify-center items-start gap-2 p-4 relative flex-1/2">
            <p
            // absolute top-2 left-4
              className={` p-1 rounded-sm text-sm text-[#e9e9e9]  ${
                assignment.level === "Easy"
                  ? "bg-green-500"
                  : assignment.level === "Medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {assignment.level}
            </p>
            <p className=" text-2xl sm:text-3xl font-semibold">
              {assignment.title}
            </p>
            <p>
              <span className="font-semibold">Due Date: </span>
              {assignment.dueDate}
            </p>
            <p>
              <span className="font-semibold">Marks: </span> {assignment.marks}
            </p>
            <div>
              <p>Author,</p>
              <div className="flex items-center gap-2">
                <img src={assignment.photo || "https://i.ibb.co.com/FLrrTVtL/man.png"} className="w-14 h-14 bg-gray-400 p-2 rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold">{assignment.author}</h2>
                  <p>{assignment.email}</p>
                </div>
              </div>
            </div>
            <p className="text-lg ">{assignment.description}</p>
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
                <Link to={'/assignments'}>
          <div className="flex gap-2 items-center text-lg text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] cursor-pointer">
            <MdOutlineKeyboardDoubleArrowLeft size={20} />
            <span>Go back</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentDetails;
