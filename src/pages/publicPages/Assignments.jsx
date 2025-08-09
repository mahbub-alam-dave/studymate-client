import React, { useEffect, useState, useRef } from "react";
import AssignmentCard from "../../components/assignmentComponent/AssignmentCard";
import axios from "axios";
import emptyAnimation from "../../assets/emptyAinmation.json";
import Lottie from "lottie-react";
import Bubbles from "../../assets/Bubbles.json";
import { motion } from "framer-motion";
import Pagination from "../../components/assignmentComponent/Pagination";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectByDifficulty, setSelectByDifficulty] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(true);
  const scrollContainerRef = useRef(null);

useEffect(() => {
    const delaySearch = setTimeout(() => {
      const fetchAndFilterAssignments = async () => {
        try {
          let url = `${import.meta.env.VITE_api_url}/assignments?page=${currentPage}&limit=${itemsPerPage}`;
          if (searchQuery.trim() !== "") {
            url = `${import.meta.env.VITE_api_url}/assignment-search?searchQuery=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`;
          }
          if (selectByDifficulty !== "All") {
            url += `&difficulty=${selectByDifficulty}`;
          }

          // Fetch assignments
          const res = await axios.get(url);
          let fetchedAssignments, total;

          if (Array.isArray(res.data)) {
            fetchedAssignments = res.data;
            // Fetch total separately
            let countUrl = `${import.meta.env.VITE_api_url}/assignments`;
            if (searchQuery.trim() !== "") {
              countUrl += `?searchQuery=${searchQuery}`;
            }
            if (selectByDifficulty !== "All") {
              countUrl += `${searchQuery.trim() !== "" ? "&" : "?"}difficulty=${selectByDifficulty}`;
            }
            const countRes = await axios.get(countUrl);
            total = countRes.data.total || fetchedAssignments.length;
          } else if (res.data.assignments && typeof res.data.total === "number") {
            fetchedAssignments = res.data.assignments;
            total = res.data.total;
          } else {
            console.error("Invalid API response:", res.data);
            fetchedAssignments = [];
            total = 0;
          }

          setAssignments(fetchedAssignments);
          setTotalAssignments(total);
        } catch (err) {
          console.error("Error fetching assignments:", err);
          setAssignments([]);
          setTotalAssignments(0);
        }
      };

      fetchAndFilterAssignments();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, selectByDifficulty, currentPage, itemsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        setShowTopShadow(scrollTop > 1);
        setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 10);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [assignments]);

  const handleDifficulty = (difficulty) => {
    setSelectByDifficulty(difficulty);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to page 1 when changing items per page
  };

  return (
    <div className="py-12 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] max-w-[1440px] w-full mx-auto">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  selectByDifficulty === level
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
          ref={scrollContainerRef}
          className={`lg:col-span-3 overflow-y-auto h-screen relative ${
            showTopShadow ? "shadow-top" : ""
          } ${showBottomShadow ? "shadow-bottom" : ""}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {assignments.length < 1 ? (
            <div className="flex flex-col gap-4 py-12 justify-center items-center px-4 sm:px-5 md:gap-6">
              <Lottie animationData={emptyAnimation} loop={true} />
              <h2 className="text-3xl font-bold text-[#FF3F33] text-center dark:text-gray-200">
                No Assignment Found!
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 pb-16">
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                  assignments={assignments}
                  setAssignments={setAssignments}
                />
              ))}
              <Pagination
                currentPage={currentPage}
                totalItems={totalAssignments}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;