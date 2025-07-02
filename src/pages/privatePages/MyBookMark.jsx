import React, { useContext, useEffect, useState } from "react";
import { ContextValue } from "../../Contextes/AllContexts";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../components/Loader";
import BookMarkAssignment from "../../components/assignmentComponent/BookMarkAssignment";
import emptyAnimation from "../../assets/emptyAinmation.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";

const MyBookMark = () => {
  const [bookMarkedAssignments, setBookMarkedAssignments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { user } = useContext(ContextValue);

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (user) {
      setFetching(true);
      axiosSecure
        .get("/my-bookmarks")
        .then((res) => setBookMarkedAssignments(res.data))
        .catch(error => {
          // error occured
        })
        .finally(() => setFetching(false));
    }
  }, [user, axiosSecure]);


    const handleRemoveBookmarkAssignment = async(assignmentId) => {
        if (!user) {
    return Swal.fire("Login required!", "Please log in to manage bookmarks.", "info");
  }

  await axiosSecure.delete(`/bookmarks/${assignmentId}`)
    .then(() => { 
    //     setBookMarkedAssignments(prev =>
    //     prev.filter(item => item.assignmentId !== assignmentId)
    //   );
        const remainingBookmarkedAssignments = bookMarkedAssignments.filter(assignment => assignment._id !== assignmentId)
        setBookMarkedAssignments(remainingBookmarkedAssignments)
        
        Swal.fire("Removed from bookmarks!", "", "success")
    })
    .catch(err => {
      
      Swal.fire("Error", "Something went wrong", "error");
    });
    }

  if (fetching) return <Loader />;
  // if (bookMarkedAssignments.length === 0) {
  //   return (
  //     <EmptyComponents message={"You haven't submitted any assignments"} />
  //   );
  // }

  return (
    <div className="py-12 px-4 sm:px-5 md:px-6 w-full">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 pb-12 justify-center items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FF3F33] dark:text-gray-200">
        My Bookmarked Assignments
      </h2>
      {bookMarkedAssignments.length < 1 ? (
        <div className="flex flex-col gap-4 py-12 justify-center items-center px-4 sm:px-5 md:px-6">
          <Lottie animationData={emptyAnimation} loop={true} />
          <h2 className="text-3xl font-bold text-[#FF3F33] text-center dark:text-gray-200">
            You haven't bookmark any assignments !
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 max-w-[1440px] w-full mx-auto">
          <table className="w-full border border-white dark:border-[#03045e] text-gray-200">
  <thead className="bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:from-[#03045e] dark:to-[#000814]">
    <tr>
      <th className="border border-white dark:border-[#03045e] p-2">Image</th>
      <th className="border border-white dark:border-[#03045e] p-2">Title</th>
      <th className="border border-white dark:border-[#03045e] p-2">Level</th>
      <th className="border border-white dark:border-[#03045e] p-2">Marks</th>
      <th className="border border-white dark:border-[#03045e] p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {bookMarkedAssignments.map((assignment) => (
      <tr
        key={assignment._id}
        className="bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:from-[#03045e] dark:to-[#000814]"
      >
        <td className="border border-white dark:border-[#03045e] p-2">
          <img
            src={assignment.imageUrl}
            alt={assignment.title}
            className="w-[120px] h-[80px] object-cover rounded-xl"
          />
        </td>
        <td className="border border-white dark:border-[#03045e] p-2">
          <h2 className="text-lg font-semibold">{assignment.title}</h2>
        </td>
        <td className="border border-white dark:border-[#03045e] p-2">
          <span
            className={`p-1 px-2 rounded-md text-gray-200 text-sm ${
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
        <td className="border border-white dark:border-[#03045e] p-2">
          {assignment.marks}
        </td>
        <td className="border border-white dark:border-[#03045e] p-2">
          <button
            onClick={() => handleRemoveBookmarkAssignment(assignment._id)}
            className="btn bg-[#FF3F33] dark:bg-[#8E1616] text-gray-200 shadow-none hover:text-white hover:bg-transparent"
          >
            Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      )}
    </div>
    </div>
  );
};

export default MyBookMark;
