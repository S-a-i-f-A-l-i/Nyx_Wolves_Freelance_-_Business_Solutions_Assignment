import React from "react";

const PaginationButton = ({ currentPage, page, handlePage }) => {
  return (
    <button disabled={currentPage === page} onClick={() => handlePage(page)}>
      {page}
    </button>
  );
};

export default PaginationButton;
