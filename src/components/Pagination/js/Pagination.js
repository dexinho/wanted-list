import React from "react";
import "../../../index.css";
import "../css/Pagination.css";

export const Pagination = ({
  currentPage,
  numberOfPageSlots,
  totalNumberOfPages,
  onPageChange,
}) => {
  let pageNumbers = [currentPage];

  for (
    let pageNumber = currentPage + 1;
    pageNumber <= Math.floor(numberOfPageSlots / 2) + currentPage;
    pageNumber++
  ) {
    pageNumbers.push(pageNumber);
  }

  for (
    let pageNumber = currentPage - 1;
    pageNumber >= currentPage - Math.floor(numberOfPageSlots / 2);
    pageNumber--
  ) {
    if (pageNumber > totalNumberOfPages) break;
    else if (pageNumber > 0) pageNumbers.unshift(pageNumber);
    else pageNumbers.push(pageNumbers.at(-1) + 1);
  }
  console.log(currentPage);

  const handlePageNumberClick = (e) => {
    onPageChange(e.target.textContent);
  };

  return (
    <div className="pagination-numbers-wrapper">
      {pageNumbers.map((num, index) => (
        <button
          className={`pagination-number ${currentPage === num ? "current" : ""}`}
          key={index}
          onClick={(e) => handlePageNumberClick(e)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};
