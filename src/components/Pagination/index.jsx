import React, { useState } from "react";
import { windowSizeForPagination } from "../../utils/constants";

export function Pagination({
  currentPage,
  prePage,
  nextPage,
  changeCurrentPage,
  totalPages,
}) {
  const windowSize = windowSizeForPagination; // Number of pages to display at a time

  // Calculate the start and end of the window dynamically
  const startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
  const endPage = Math.min(totalPages, startPage + windowSize - 1);

  // Adjust startPage to always show 5 numbers
  const adjustedStartPage = Math.max(1, endPage - windowSize + 1);

  // page numbers to display
  const pageNumbers = [];
  for (let i = adjustedStartPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={prePage} disabled={currentPage === 1}>
        Prev
      </button>

      {/* Display page numbers dynamically, 5 per window */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => changeCurrentPage(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ))}

      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
