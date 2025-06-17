import React, { useContext, useEffect, useState } from "react";
import { ContextValue } from "../../Contextes/AllContexts";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../components/Loader";
import BookMarkAssignment from "../../components/assignmentComponent/BookMarkAssignment";
import emptyAnimation from "../../assets/emptyAinmation.json";
import Lottie from "lottie-react";

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
          {bookMarkedAssignments.map((assignment) => (
            <BookMarkAssignment key={assignment._id} assignment={assignment}
            setBookMarkedAssignments={setBookMarkedAssignments}
            bookMarkedAssignments={bookMarkedAssignments} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MyBookMark;
