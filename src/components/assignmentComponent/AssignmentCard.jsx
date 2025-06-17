import React, { useContext } from "react";
import { ContextValue } from "../../Contextes/AllContexts";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaRegBookmark } from "react-icons/fa";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const AssignmentCard = ({ assignment, assignments, setAssignments }) => {
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

  const handleUpdateAssignment = (id) => {
    if (user?.email === assignment.email) {
      navigate(`/update-assignment/${id}`);
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
  };

  const handleViewAssignment = (id) => {
    if (user) return navigate(`/view-assignment-details/${id}`);
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "Please login to see details!",
      showConfirmButton: false,
      timer: 1500,
    });
  };


  const handleAddBookmark = async (assignmentId) => {
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
  }

  return (
    <div className="w-full flex flex-col sm:flex-row bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814] text-gray-200 border border-white dark:border-[#03045e] shadow-sm rounded-2xl gap-4 relative p-4">
      <img
        className="sm:w-[320px]  object-cover rounded-tl-2xl rounded-tr-2xl sm:rounded-2xl"
        src={assignment.imageUrl}
        alt={assignment.title}
      />
      <div className="flex flex-col gap-3 justify-center">
        <div className="flex flex-col gap-1">
          <div className="flex gap-12 items-center">
          <p
            className={`p-1 px-2 rounded-md text-gray-200 text-sm ${
              assignment.level === "Easy"
                ? "bg-green-500"
                : assignment.level === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {assignment.level}
          </p>
          <FaRegBookmark onClick={() => handleAddBookmark(assignment._id)} size={20}/>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            {assignment.title}
          </h2>
        </div>
        <p className="text-base sm:text-lg">
          <span>Marks: </span> {assignment.marks}
        </p>
        {/* <p>{assignment.description}</p> */}
        <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <button
            onClick={() => handleViewAssignment(assignment._id)}
            className="btn bg-[#4ED7F1] dark:bg-[#03045e] text-gray-200 hover:text-white hover:bg-transparent"
          >
            View Details
          </button>
          <button
            onClick={() => handleUpdateAssignment(assignment._id)}
            className="btn bg-[#3D8D7A] dark:bg-[#155E95] text-gray-200 hover:text-white hover:bg-transparent"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteAssignment(assignment._id)}
            className="btn bg-[#FF3F33] dark:bg-[#8E1616] text-gray-200 shadow-none hover:text-white hover:bg-transparent"
          >
            Delete
          </button>
        </div>
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
