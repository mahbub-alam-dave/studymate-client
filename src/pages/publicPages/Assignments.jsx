import React, { useEffect, useState, useRef } from "react";
import AssignmentCard from "../../components/assignmentComponent/AssignmentCard";
import axios from "axios";
import emptyAnimation from "../../assets/emptyAinmation.json";
import Lottie from "lottie-react";
import Bubbles from "../../assets/Bubbles.json";
import { motion } from "framer-motion";
import Pagination from "../../components/assignmentComponent/Pagination";

import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
const API_URL = import.meta.env.VITE_api_url;

// Fetch function for TanStack Query
const fetchAssignments = async ({ queryKey }) => {
  const [_key, { page, limit, category, searchQuery }] = queryKey;
  const params = {};
  if(limit) params.limit = limit;
  if(page) params.page = page;
  if (category) params.category = category;
  if (searchQuery.trim()) params.searchQuery = searchQuery.trim();
  console.log(params)
  const { data } = await axios.get(`${API_URL}/assignments`, { params });
  return data;
};

const Assignments = () => {

  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);



 // Debounce search input
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 400); // wait 400ms after last keystroke
    return () => clearTimeout(delay);
  }, [searchInput]);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assignments", { page, limit, category, searchQuery }],
    queryFn: fetchAssignments,
    keepPreviousData: true,
  });

  console.log(data)



  const handleDifficulty = (difficulty) => {
    // setCategory(difficulty === "All" ? "" : difficulty)
    setCategory(difficulty)
  };

  console.log(category)

  // Example data (replace with API data)
  // const assignments = Array.from({ length: 42 }, (_, i) => ({
  //   id: i + 1,
  //   title: `Assignment ${i + 1}`,
  // }));

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentAssignments = assignments.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  return (
    <div className="w-full px-4 sm:px-5 md:px-6">
    <div className="py-12 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] max-w-[1440px] w-full mx-auto ">
      <h2 className="text-2xl md:text-3xl font-bold mb-12">All Assignments</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-1 lg:h-screen sticky top-0 flex flex-col relative overflow-hidden"
        >
          <label className="w-[60%] lg:w-full flex items-center gap-2 p-2 rounded bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus-within:outline-none focus-within:ring-0">
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="text-sm focus:outline-none focus:ring-0 focus:border-none"
              required
              placeholder="Search assignment..."
            />
          </label>
          <div className="flex gap-3 flex-wrap mt-3">
            {["All", "Easy", "Medium", "Hard"].map((level) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={level}
                onClick={() => handleDifficulty(level)}
                className={`${
                  category === level 
                    ? "bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)]"
                    : "bg-transparent"
                } px-[12px] py-[6px] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-sm`}
              >
                {level}
              </motion.button>
            ))}
          </div>
          <div className="absolute hidden lg:block lg:h-screen inset-0 pointer-events-none opacity-40">
            <Lottie animationData={Bubbles} loop={true} />
          </div>
        </motion.div>
          
        <div
          className={`lg:col-span-3 overflow-y-auto h-screen relative`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
          {
            isLoading ? <Loader /> 
              :
          <div>
          {data.assignments.length < 1 ? (
            <div className="flex flex-col gap-4 py-12 justify-center items-center px-4 sm:px-5 md:gap-6">
              <Lottie animationData={emptyAnimation} loop={true} />
              <h2 className="text-3xl font-bold text-[#FF3F33] text-center dark:text-gray-200">
                No Assignment Found!
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 pb-16">
              {data.assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                  // assignments={assignments}
                  // setAssignments={setAssignments}
                />
              ))}
              
            </div>
          )}
          </div>
          
        }
        </div>
      </div>
      {/* pagination */}
      <div>
      {/* Page Size Selector */}
      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        {[5, 10, 15].map((n) => (
          <option key={n} value={n}>
            {n} per page
          </option>
        ))}
      </select>

      {/* Pagination */}
      <Pagination
        totalPages={data?.totalPages}
        currentPage={data?.currentPage}
        onPageChange={setPage}
      />
      </div>
    </div>
    </div>
  );
};

export default Assignments;