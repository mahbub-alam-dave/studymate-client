import React, { useContext } from "react";
import { ContextValue } from "../../Contextes/AllContexts";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AssignmentCard = ({ assignment, assignments, setAssignments }) => {
  const { user } = useContext(ContextValue);

  const navigate = useNavigate();

  const handleDeleteAssignment = (id) => {
    if (assignment.email === user.email) {
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
            });
        }
        // else if (result.isDenied) {
        //   Swal.fire("Changes are not saved", "", "info");
        // }
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
    if (user.email === assignment.email) {
      navigate(`/update-assignment/${id}`);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't update this assignment",
        showConfirmButton: false,
        timer: 1500,
      });
      return
    }
  };

  const handleViewAssignment = id => {
    navigate(`/view-assignment-details/${id}`)
  }
  return (
    <div className="w-full flex flex-col sm:flex-row border border-[var(--color-border)] bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] text-gray-200 rounded-2xl relative">
      <img
        className="sm:w-[220px]  object-cover rounded-tl-2xl rounded-tr-2xl sm:rounded-tr-[0px] sm:rounded-bl-2xl"
        src={assignment.imageUrl}
        alt={assignment.title}
      />
      <div className="flex flex-col gap-2 p-4 relative">
        <p
          className={`absolute top-2 left-4 p-1 rounded-sm text-sm  mb-4 ${
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
        {/* <p>{assignment.dueDate}</p> */}
        <p>
          <span>Marks: </span> {assignment.marks}
        </p>
        {/* <p>{assignment.description}</p> */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => handleViewAssignment(assignment._id)} className="btn">View Details</button>
          <button
            onClick={() => handleUpdateAssignment(assignment._id)}
            className="btn"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteAssignment(assignment._id)}
            className="btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
