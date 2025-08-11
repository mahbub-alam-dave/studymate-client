export default function Pagination({ totalPages, currentPage, onPageChange }) {
  // if (totalPages <= 1) return null;

  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
      <button
        onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            style={{
              fontWeight: currentPage === pageNum ? "bold" : "normal",
            }}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
