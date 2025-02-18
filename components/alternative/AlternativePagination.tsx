import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AlternativePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPrev: (type: "prev" | "next") => void;
}

export default function AlternativePagination({
  currentPage,
  totalPages,
  onPageChange,
  onNextPrev,
}: AlternativePaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];

    // Always show the first page
    pages.push(
      <button
        key={1}
        className={`px-4 py-2 rounded-lg ${
          1 === currentPage
            ? "bg-[#AF583B] text-white"
            : "text-[#1F1F1F] hover:bg-[#1F1F1F]/5"
        } transition-colors`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    // Show ellipsis if currentPage is greater than 3
    if (currentPage > 3) {
      pages.push(<span key="ellipsis-start">...</span>);
    }

    // Show currentPage - 1, currentPage, currentPage + 1
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          className={`px-4 py-2 rounded-lg ${
            i === currentPage
              ? "bg-[#AF583B] text-white"
              : "text-[#1F1F1F] hover:bg-[#1F1F1F]/5"
          } transition-colors`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if currentPage is less than totalPages - 2
    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis-end">...</span>);
    }

    // Always show the last page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`px-4 py-2 rounded-lg ${
            totalPages === currentPage
              ? "bg-[#AF583B] text-white"
              : "text-[#1F1F1F] hover:bg-[#1F1F1F]/5"
          } transition-colors`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        className="flex items-center gap-1 px-4 py-2 rounded-lg text-[#1F1F1F] hover:bg-[#1F1F1F]/5 transition-colors"
        onClick={() => onNextPrev("prev")}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {renderPageNumbers()}

      <button
        className="flex items-center gap-1 px-4 py-2 rounded-lg text-[#1F1F1F] hover:bg-[#1F1F1F]/5 transition-colors"
        onClick={() => onNextPrev("next")}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
