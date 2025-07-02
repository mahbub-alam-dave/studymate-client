import React, { useContext } from 'react';
import { ContextValue } from '../../Contextes/AllContexts';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const BookMarkAssignment = ({assignment, bookMarkedAssignments, setBookMarkedAssignments}) => {

    const {user} = useContext(ContextValue)
    const axiosSecure = UseAxiosSecure()

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

    return (
<div className="w-full flex flex-col sm:flex-row bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814] text-gray-200 border border-white dark:border-[#03045e] shadow-sm rounded-2xl gap-4 relative p-4">
      <img
        className="sm:w-[320px]  object-cover rounded-tl-2xl rounded-tr-2xl sm:rounded-2xl"
        src={assignment.imageUrl}
        alt={assignment.title}
      />
      <div className="flex flex-col gap-3 justify-center">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-12 items-center">
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
            onClick={() => handleRemoveBookmarkAssignment(assignment._id)}
            className="btn bg-[#FF3F33] dark:bg-[#8E1616] text-gray-200 shadow-none hover:text-white hover:bg-transparent"
          >
            Remove From Bookmark
          </button>
        </div>
      </div>
    </div>
    );
};

export default BookMarkAssignment;