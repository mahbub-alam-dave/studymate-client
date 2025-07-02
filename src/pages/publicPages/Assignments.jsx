import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AssignmentCard from "../../components/assignmentComponent/AssignmentCard";
import { IoFilterSharp } from "react-icons/io5";
import axios from "axios";
import emptyAnimation from "../../assets/emptyAinmation.json";
import Lottie from "lottie-react";
// import { ContextValue } from "../../Contextes/AllContexts";

const Assignments = () => {
  const allAssignments = useLoaderData();
  // const {user} = useContext(ContextValue)
  const [assignments, setAssignments] = useState(allAssignments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectByDifficulty, setSelectByDifficulty] = useState("All");

useEffect(() => {
  const delaySearch = setTimeout(() => {
    // if (!user) return;
    const fetchAndFilterAssignments = async () => {
      try {
        let result = [];

        if (searchQuery.trim() !== "") {
          // const token = await user?.getIdToken();
          /* const res = await axios.get(`https://study-mate-server-gamma.vercel.app/assignments/search?searchQuery=${searchQuery}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }); */
          const res = await axios.get(`${import.meta.env.VITE_api_url}/assignment-search?searchQuery=${searchQuery}`)
          result = res.data;
        } else {
          result = allAssignments;
        }

        // Apply difficulty filter on whichever data source is active
        if (selectByDifficulty !== "All") {
          result = result.filter((item) => item.level === selectByDifficulty);
        }

        setAssignments(result);
      } catch (err) {
        // error occured
      }
    };

    fetchAndFilterAssignments();
  }, 500);

  return () => clearTimeout(delaySearch);
}, [searchQuery, selectByDifficulty, allAssignments]);


  return (
    <div className="py-12 px-4 sm:px-5 md:px-6 w-full text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
      <div className="flex flex-col gap-4 pb-12 justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          All Assignments
        </h2>
        <div className="flex items-center">
          <label className="flex items-center gap-2 p-2 rounded border bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] border-gray-300 focus-within:outline-none focus-within:ring-0">
            <svg
              className="h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" text-sm focus:outline-none focus:ring-0 focus:border-none"
              required
              placeholder="Search assignment..."
            />
          </label>
          <select
            value={selectByDifficulty}
            onChange={(e) => setSelectByDifficulty(e.target.value)}
            className="select focus:outline-none ml-2 border-white bg-[var(--color-primary)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-dark)]"
          >
            <option value="All" defaultValue={"all"}>All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      {assignments.length < 1 ? (
        <div className="flex flex-col gap-4 py-12 justify-center items-center px-4 sm:px-5 md:px-6">
          <Lottie animationData={emptyAnimation} loop={true} />
          <h2 className="text-3xl font-bold text-[#FF3F33] text-center dark:text-gray-200">
            No Assignment Found !
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 max-w-[1440px] w-full mx-auto">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              assignments={assignments}
              setAssignments={setAssignments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;
