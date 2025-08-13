import React, { useContext, useEffect, useState } from "react";
import { ContextValue } from "../../Contextes/AllContexts";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../components/Loader";
import BookMarkAssignment from "../../components/assignmentComponent/BookMarkAssignment";
import emptyAnimation from "../../assets/emptyAinmation.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyBookMark = () => {
  const [bookMarkedAssignments, setBookMarkedAssignments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { user } = useContext(ContextValue);

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
      setFetching(true);
      axiosSecure
        .get(`/my-bookmarks?email=${user.email}`)
        .then((res) => {setBookMarkedAssignments(res.data) 
          console.log(res)
         }) 
        .catch(error => {
          // error occured
        })
        .finally(() => setFetching(false));

  }, [user.email, axiosSecure]);

  console.log(bookMarkedAssignments)

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
    <div className="py-8 w-full">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 pb-12 justify-center">
        <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
        My Bookmarked Assignments
      </h2>
      <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">All the assignments bookmarked by yourselves. You can navigate to any assignment details page or remove any assignments</p>
        </div>
      {bookMarkedAssignments.length === 0 ? (
        <div className="flex flex-col gap-4 py-12 justify-center items-center">
          <Lottie animationData={emptyAnimation} loop={true} />
          <h2 className="text-3xl font-bold text-[#FF3F33] text-center dark:text-gray-200">
            You haven't bookmark any assignments !
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 w-full">
          <div className="overflow-x-auto w-full rounded-xl overflow-hidden 
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
      {bookMarkedAssignments.map((assignment) => (
        <tr key={assignment._id} className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <td className="p-4">
            <img
              src={assignment.imageUrl}
              alt={assignment.title}
              className="w-28 h-20 object-cover rounded-lg"
            />
          </td>
          <td className="p-4 text-base font-medium">{assignment.title}</td>
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
            <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() =>
                handleRemoveBookmarkAssignment(assignment._id)
              }
              className="cursor-pointer btn rounded-md bg-red-500 dark:bg-[#8E1616] text-[var(--color-text-primary-dark)] text-sm"
            >
              Remove
            </button>
            <Link to={`/view-assignment-details/${assignment._id}`}>
            <button
              className="cursor-pointer btn bg-[var(--color-primary)] rounded-md dark:bg-[var(--color-primary-dark)] text-white text-sm"
            >
              View
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

export default MyBookMark;
