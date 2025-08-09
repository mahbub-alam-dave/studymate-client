import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-4 sm:px-5">
      <div className="flex items-center gap-2">
        <span className="text-sm">Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="text-sm p-1 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]"
        >
          {[5, 10, 20].map((value) => (
            <option key={value} value={value}>
              {value} per page
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-sm ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </motion.button>
        {pageNumbers.map((page) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-sm ${
              currentPage === page
                ? "bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)]"
                : ""
            }`}
          >
            {page}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-sm ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;