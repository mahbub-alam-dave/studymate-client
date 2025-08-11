import React, { useContext } from "react";
import { ContextValue } from "../../Contextes/AllContexts";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaRegBookmark } from "react-icons/fa";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

// 
const AssignmentCard = ({assignment}) => {
  const { user } = useContext(ContextValue);
    const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const handleDeleteAssignment = (id) => {
    if (assignment.email === user?.email) {
      Swal.fire({
        title: "Do you want to delete the assignment?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
        // denyButtonText: `Don't Delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .patch(`https://study-mate-server-gamma.vercel.app/assignments/${id}/delete`)
            .then((res) => {
              if (res.data.modifiedCount) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Assignment has removed successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                const remainingAssignments = assignments.filter(
          (assignment) => assignment._id.toString() !== id
        );
        setAssignments(remainingAssignments);
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
        }
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't delete this assignment",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  };

/*   const handleUpdateAssignment = (id) => {
    if (user?.email === assignment.email) {
      navigate(`/dashboard/update-assignment/${id}`);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't update this assignment",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  }; */

/*   const handleViewAssignment = (id) => {
    if (user) return navigate(`/view-assignment-details/${id}`);
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "Please login to see details!",
      showConfirmButton: false,
      timer: 1500,
    });
  }; */


/*   const handleAddBookmark = async (assignmentId) => {
      if (!user) {
    return Swal.fire("Login required!", "Please log in to bookmark.", "info");
  }
  await axiosSecure.post("/bookmarks", { assignmentId })
    .then(() => Swal.fire("Bookmarked!", "", "success"))
    .catch(err => {
      if (err.response?.status === 400) {
        Swal.fire("Already bookmarked", "", "info");
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    });
  } */
// dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814]
  return (
    <div className="w-full flex flex-col md:flex-row  bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]   rounded-xl relative ">
      {/* <div className="flex flex-col sm:flex-row gap-6 "> */}
      <img
        className="w-full md:max-w-[360px] max-h-[330px] h-auto shrink-0  object-cover rounded-tl-xl rounded-tr-xl sm:rounded-tl-xl sm:rounded-bl-xl md:rounded-tr-none"
        src={assignment.imageUrl}
        alt={assignment.title}
      />
      <div className="flex flex-col justify-center gap-3 flex-1 p-4 py-8 md:py-4">
        <div className="flex flex-col items-start gap-2">
          <p
            className={`p-1 px-3 rounded-2xl text-gray-200 text-xs ${
              assignment.level === "Easy"
                ? "bg-green-500"
                : assignment.level === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {assignment.level}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold">
            {assignment.title}
          </h2>
        </div>
        <p className="text-base sm:text-lg">
          <span>Marks: </span> {assignment.marks}
        </p>
        <p className="text-base sm:text-lg">
          <span>Deadline: </span> {assignment.dueDate}
        </p>
        {/* <p>{assignment.description}</p> */}
        <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <button
            onClick={() => handleViewAssignment(assignment._id)}
            className="btn btn-sm bg-[var(--color-primary)] text-[var(--color-text-primary-dark)]"
          >
            View Details
          </button>
          <button
            onClick={() => handleUpdateAssignment(assignment._id)}
            className="btn btn-sm btn-outline text-[var(--color-text-primary-)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteAssignment(assignment._id)}
            className="btn btn-sm btn-outline text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
          >
            Delete
          </button>
        </div>
      </div>
      <div onClick={() => handleAddBookmark(assignment._id)} className="absolute top-4 right-4 bg-[var(--color-bg)] dark:bg-gray-700 rounded-[50%] p-[10px] items-start cursor-pointer">
        <FaRegBookmark  size={18}/>
      </div>
      </div>
  );
};

export default AssignmentCard;

/* axios
            .delete(`http://localhost:3000/assignments/${id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Assignment has deleted successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                const remainingAssignment = assignments.filter(
                  (assignment) => assignment._id !== id
                );
                setAssignments(remainingAssignment);
              }
            }); */


            /* <button
            onClick={() => handleViewAssignment(assignment._id)}
            className="btn bg-[var(--color-text-primary)] text-[var(--color-text-primary-dark)] dark:text-[var(--color-text-primary-dark)] hover:bg-transparent hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
          >
            View Details
          </button>
          <button
            onClick={() => handleUpdateAssignment(assignment._id)}
            className="btn bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] hover:bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteAssignment(assignment._id)}
            className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] hover:bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
          >
            Delete
          </button> */
