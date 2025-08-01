import { useState } from "react";

export const usePagination = (
  items: any[], 
  itemsPerPage: number, 
  setCurrentPage: (page: number) => void, 
  currentPage: number 
) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Get the items for the current page
  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); 
  }; 

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };


  return {
    totalPages,
    currentItems,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  };
};
