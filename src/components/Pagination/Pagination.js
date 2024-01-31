import React, { useRef, useState } from "react";

export const Pagination = ({
  currentPage,
  numberOfPageSlots,
  totalNumberOfPages,
  onPageChange,
}) => {
  let pageNumbers = [currentPage];
  const currentPageNumberRef = useRef(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  console.log(totalNumberOfPages)

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

  const handlePageNumberClick = (e) => {
    setCurrentPageNumber(e.target.textContent);
    onPageChange(e.target.textContent);
  };

  return (
    <div>
      {pageNumbers.map((num, index) => (
        <button
          key={index}
          ref={currentPageNumber === num ? currentPageNumberRef : null}
          onClick={(e) => handlePageNumberClick(e)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};
