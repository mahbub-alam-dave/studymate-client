import React, { useContext, useEffect, useState } from "react";
import { ContextValue } from "../../Contextes/AllContexts";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../components/Loader";
import BookMarkAssignment from "../../components/assignmentComponent/BookMarkAssignment";
import emptyAnimation from "../../assets/emptyAinmation.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import { GrFormView } from "react-icons/gr";


const MyAssignments = () => {
  const { user } = useContext(ContextValue);
  const queryClient = useQueryClient();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate()

  const {
    data: myAssignments = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["my-created-assignments"], // cache key
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_api_url}/my-created-assignments?email=${user.email}`
      );
      return res.data;
    },
  });

// Mutation for deleting assignment
const deleteAssignmentMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_api_url}/assignments/${id}/delete`
    );
    return res.data;
  },
  onSuccess: (data) => {
    if (data.modifiedCount) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Assignment has been removed successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      // Refetch assignments list
      queryClient.invalidateQueries(['assignments']);
    }
  },
  onError: (error) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

const handleDeleteAssignment = (id, email) => {
  if (email === user?.email) {
    Swal.fire({
      title: 'Do you want to delete the assignment?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAssignmentMutation.mutate(id);
        refetch()
      }
    });
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: "You can't delete this assignment",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

  const handleUpdateAssignment = (id, email) => {
    if (user?.email === email) {
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
  };

  if (isLoading) return <Loader />;

  return (
    <div className="py-8 w-full">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 pb-12 justify-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
            My All Created Assignments
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            All the assignments created by yourselves. You can manage a
            assignment like delete, update and view details from here at the
            dashboard
          </p>
        </div>
        {myAssignments.length === 0 ? (
          <div className="flex flex-col gap-4 py-12 justify-center items-center">
            <Lottie animationData={emptyAnimation} loop={true} />
            <h2 className="text-3xl font-bold text-[#FF3F33] text-center dark:text-gray-200">
              You haven't bookmark any assignments !
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 w-full">
            <div
              className="overflow-x-auto w-full rounded-xl overflow-hidden 
  text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]
  border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]"
            >
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="text-left border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
                    <th className="p-4">Image</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Level</th>
                    <th className="p-4">Marks</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myAssignments.map((assignment) => (
                    <tr
                      key={assignment._id}
                      className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
                    >
                      <td className="p-4">
                        <img
                          src={assignment.imageUrl}
                          alt={assignment.title}
                          className="w-28 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td className="p-4 text-base font-medium">
                        {assignment.title}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-md text-sm text-white ${
                            assignment.level === "Easy"
                              ? "bg-green-500"
                              : assignment.level === "Medium"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {assignment.level}
                        </span>
                      </td>
                      <td className="p-4">{assignment.marks}</td>
                      <td className="p-4 ">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              handleDeleteAssignment(assignment._id, assignment.email)
                            }
                            className="cursor-pointer px-3 py-1 rounded-md bg-red-500 dark:bg-[#8E1616] text-white text-sm"
                          >
                            <MdOutlineDeleteOutline />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateAssignment(assignment._id, assignment.email)
                            }
                            className="cursor-pointer px-3 py-1 rounded-md bg-red-500 dark:bg-[#8E1616] text-white text-sm"
                          >
                            <MdOutlineUpdate />
                          </button>
                          <Link
                            to={`/view-assignment-details/${assignment._id}`}
                          >
                            <button className="cursor-pointer px-3 py-1 bg-[var(--color-primary)] rounded-md dark:bg-[var(--color-primary-dark)] text-white text-sm">
                              <GrFormView />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssignments;
